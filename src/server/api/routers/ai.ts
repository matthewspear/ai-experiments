import { TRPCError } from "@trpc/server";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";
import { results } from "@/server/db/schema/results";
import { openai } from "@/server/openai";
import { redis } from "@/server/redis";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getCredits, getUserCredits } from "./credit";

const emojiResponse = z.object({
  emojis: z.array(z.string()),
});

const defaultModel = "gpt-4o-2024-08-06";

export const aiRouter = createTRPCRouter({
  completion: publicProcedure
    .input(
      z.object({
        prompt: z.string().optional(),
        query: z.string(),
        model: z.string().optional(),
        temperature: z.number().optional(),
        maxTokens: z.number().optional(),
        topP: z.number().optional(),
        jsonMode: z.boolean().optional(),
        task: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx: { req, headers, auth, db } }) => {
      const { key, credits } = auth.userId
        ? await getUserCredits(auth.userId)
        : await getCredits(req, headers);

      console.log(key);
      if (credits == null || credits <= 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Insufficient credits",
        });
      }
      const messages: ChatCompletionMessageParam[] = [];

      if (input.prompt) {
        messages.push({
          role: "system",
          content: input.prompt,
        });
      }

      messages.push({
        role: "user",
        content: input.query,
      });

      const model = input.model ?? defaultModel;
      const temperature = input.temperature ?? 0.0;
      const maxTokens = input.maxTokens ?? 256;
      const topP = input.topP ?? 1;

      const response_format = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
        response_format:
          input.jsonMode === true ? { type: "json_object" } : undefined,
      });

      const message = response_format.choices[0]?.message.content;

      const response = {
        message: message,
      };

      await Promise.all([
        // Deduct credit
        redis.decr(key),
        // Log to db
        db.insert(results).values({
          task: input.task ?? "unknown",
          model: model,
          temperature: temperature,
          userPrompt: input.query,
          fullPrompt: input.query,
          response: response,
          usage: response_format.usage,
          userId: auth.userId ?? key,
        }),
      ]);

      return response;
    }),
  emoji: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        query: z.string(),
        model: z.string().optional(),
        temperature: z.number().optional(),
        maxTokens: z.number().optional(),
        topP: z.number().optional(),
        jsonMode: z.boolean().optional(),
      }),
    )
    .output(emojiResponse)
    .mutation(async ({ input, ctx: { req, headers, auth, db } }) => {
      const { key, credits } = auth.userId
        ? await getUserCredits(auth.userId)
        : await getCredits(req, headers);

      console.log(key);
      if (credits == null || credits <= 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Insufficient credits",
        });
      }
      const messages: ChatCompletionMessageParam[] = [
        {
          role: "system",
          content: input.prompt,
        },
        {
          role: "user",
          content: input.query,
        },
      ];

      const model = input.model ?? defaultModel;

      const response_format = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: input.temperature ?? 0.0,
        max_tokens: input.maxTokens ?? 256,
        top_p: input.topP ?? 1,
        response_format:
          input.jsonMode === true ? { type: "json_object" } : undefined,
      });

      console.log(response_format);

      const message = response_format.choices[0]?.message.content;

      console.log(message);

      if (message == null) {
        return { emojis: [] };
      }

      try {
        const data = emojiResponse.parse(JSON.parse(message));
        console.log(data);

        await Promise.all([
          // Deduct credit
          redis.decr(key),
          // Log to db
          db.insert(results).values({
            task: "emoji",
            model: model,
            temperature: input.temperature ?? 0.0,
            userPrompt: input.prompt,
            fullPrompt: input.query,
            response: data,
            usage: response_format.usage,
            userId: auth.userId ?? key,
          }),
        ]);

        return {
          emojis: data.emojis,
        };
      } catch (error: unknown) {
        console.log(error);
        return { emojis: [] };
      }
    }),
});

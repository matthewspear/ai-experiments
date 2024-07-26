import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { openai } from "@/server/openai";
import { getCredits, getUserCredits } from "./credit";
import { TRPCError } from "@trpc/server";
import { redis } from "@/server/redis";
import { results } from "@/server/db/schema/results";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";

const emojiResponse = z.object({
  emojis: z.array(z.string()),
});

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

      try {
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

        const model = input.model ?? "gpt-4o";
        const temperature = input.temperature ?? 0.0;
        const maxTokens = input.maxTokens ?? 256;
        const topP = input.topP ?? 1;

        const response_format = await openai.chat.completions.create({
          model: input.model ?? "gpt-4o",
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens,
          top_p: topP,
          response_format:
            input.jsonMode == true ? { type: "json_object" } : undefined,
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
      } catch (error: unknown) {
        throw error;
      }
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

      try {
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

        const response_format = await openai.chat.completions.create({
          model: input.model ?? "gpt-4o",
          messages: messages,
          temperature: input.temperature ?? 0.0,
          max_tokens: input.maxTokens ?? 256,
          top_p: input.topP ?? 1,
          response_format:
            input.jsonMode == true ? { type: "json_object" } : undefined,
        });

        const message = response_format.choices[0]?.message.content;

        if (message == undefined) {
          return { emojis: [] };
        }

        try {
          const data = emojiResponse.parse(JSON.parse(message));

          await Promise.all([
            // Deduct credit
            redis.decr(key),
            // Log to db
            db.insert(results).values({
              task: "emoji",
              model: input.model ?? "gpt-4o",
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
      } catch (error: unknown) {
        throw error;
      }
    }),
});

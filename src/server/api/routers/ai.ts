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
          model: input.model ?? "gpt-3.5-turbo",
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
              model: input.model ?? "gpt-3.5-turbo",
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

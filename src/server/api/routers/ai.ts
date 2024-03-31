import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { openai } from "@/server/openai";

const emojiResponse = z.object({
  emojis: z.array(z.string()),
});

export const aiRouter = createTRPCRouter({
  singleChatCompletion: publicProcedure
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
    .mutation(async ({ input }) => {
      try {
        return await openai.chat.completions.create({
          model: input.model ?? "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: input.prompt,
            },
            {
              role: "user",
              content: input.query,
            },
          ],
          temperature: input.temperature ?? 0.0,
          max_tokens: input.maxTokens ?? 256,
          top_p: input.topP ?? 1,
          response_format:
            input.jsonMode == true ? { type: "json_object" } : undefined,
        });
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
    .mutation(async ({ input }) => {
      try {
        const response_format = await openai.chat.completions.create({
          model: input.model ?? "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: input.prompt,
            },
            {
              role: "user",
              content: input.query,
            },
          ],
          temperature: input.temperature ?? 0.0,
          max_tokens: input.maxTokens ?? 256,
          top_p: input.topP ?? 1,
          response_format:
            input.jsonMode == true ? { type: "json_object" } : undefined,
        });
        const message = response_format.choices[0]?.message.content;

        console.log(message);

        if (message == undefined) {
          return { emojis: [] };
        }
        
        try {
          const data = emojiResponse.parse(JSON.parse(message));
          return { 
            emojis: data.emojis
          };
        } catch {
          return { emojis: [] };
        }
      } catch (error: unknown) {
        throw error;
      }
    }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { prisma } from "@prisma/client";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function checkAPIKey() {
  if (!configuration.apiKey) {
    return {
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    };
  }
}

export const aiRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        text: z.string(),
        temperature: z.number().optional(),
        task: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      checkAPIKey();

      const query = input.text || "";
      if (query.trim().length === 0) {
        return {
          error: {
            message: "Please enter a valid prompt",
          },
        };
      }
      console.log("Input", query);
      const fullPrompt = generatePrompt(query);
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: fullPrompt,
          temperature: input.temperature ?? 0.6,
          max_tokens: 265,
        });

        const result = completion.data.choices[0]?.text;

        console.log("Result", result);
        if (result) {
          await ctx.prisma.result.create({
            data: {
              task: input.task ?? "",
              model: "text-davinci-003",
              temperature: input.temperature ?? 0.6,
              userPrompt: input.text,
              fullPrompt: fullPrompt,
              result: result,
              userId: ctx.session?.user.id,
            },
          });

          return { result: result };
        } else {
          return {
            error: {
              message: "Could not read result from OpenAI API",
            },
          };
        }
      } catch (error: any) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          return {
            error: error,
          };
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          return {
            error: {
              message: "An error occurred during your request.",
            },
          };
        }
      }
    }),
});

function generatePrompt(query: string) {
  // For now just passthrough result
  return query.trim() + ":";
}

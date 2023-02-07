import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";

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
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      checkAPIKey();

      const query = input.text || "";
      if (query.trim().length === 0) {
        return {
          error: {
            message: "Please enter a valid prompt",
          },
        };
      }

      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(query),
          temperature: 0.6,
          max_tokens: 200,
        });

        const result = completion.data.choices[0]?.text;

        console.log("Result", result);
        if (result) {
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

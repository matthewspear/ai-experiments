import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { encode } from "gpt-3-encoder";
import { Prisma } from "@prisma/client";
import axios, { type AxiosError } from "axios";

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
        max_tokens: z.number().optional(),
      })
    )
    .output(
      z.object({
        result: z.string().optional(),
        error: z
          .object({
            message: z.string(),
          })
          .optional(),
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
      let output = "";

      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: fullPrompt,
          temperature: input.temperature ?? 0.6,
          max_tokens: input.max_tokens ?? 265,
        });
        const result = completion.data.choices[0]?.text;
        console.log("Result", result);
        if (result) {
          output = result;
        } else {
          return {
            error: {
              message: "Could not read result from OpenAI API",
            },
          };
        }
      } catch (error: unknown) {
        // TODO: Improve error handling
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const axiosError = error as AxiosError<
              {
                error: {
                  message: string;
                  type: string;
                  // param: any;
                  code: string;
                };
              },
              Error
            >;
            // console.log(JSON.stringify(axiosError.response?.data, null, 2));

            const message = axiosError.response?.data.error.message;
            const requestMessage = error.message;

            return {
              error: {
                message: message ?? requestMessage,
              },
            };
          } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            return {
              error: {
                message: "An error occurred during your request.",
              },
            };
          }
        } else if (error instanceof Error) {
          // Just a stock error
          return {
            error: {
              message: "An error occurred during your request.",
            },
          };
        } else {
          // unknown
          return {
            error: {
              message: "An error occurred...",
            },
          };
        }
      }

      await ctx.prisma.result
        .create({
          data: {
            task: input.task ?? "",
            model: "text-davinci-003",
            temperature: input.temperature ?? 0.6,
            userPrompt: input.text,
            fullPrompt: fullPrompt,
            result: output,
            userId: ctx.session?.user.id,
          },
        })
        .catch((error) => {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("Prisma error:", error.message);
          }
        });

      return {
        result: output,
      };
    }),
  tokens: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      const encoded = encode(input.text);
      return {
        count: encoded.length,
      };
    }),
});

function generatePrompt(query: string) {
  // For now just passthrough result
  return query.trim() + ":";
}

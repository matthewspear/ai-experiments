import { Redis } from "@upstash/redis";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const redis = Redis.fromEnv();

const anonymousCreditDefault = 5; // Example: 5 free credits per day

export const creditRouter = createTRPCRouter({
  getCredit: publicProcedure
    .output(
      z.object({
        creditsKey: z.string(),
        credits: z.number(),
      }),
    )
    .query(async ({ ctx: { req } }) => {
      const ip = req.headers.get("x-forwarded-for") ?? req.ip;
      const creditsKey = `anonymous_credits:${ip}`;
      const now = new Date();
      const endOfDay = new Date(now).setHours(24, 0, 0, 0) - now;
      const ttl = Math.ceil(endOfDay / 1000); // TTL in seconds until the end of the day

      let credits = await redis.get<number>(creditsKey);

      if (credits == null) {
        // Allocate initial daily credits for a new user
        credits = anonymousCreditDefault;
        await redis.setex(creditsKey, ttl, credits);
      }

      return {
        creditsKey: creditsKey,
        credits: credits,
      };
    }),
  updateCredit: publicProcedure
    .input(
      z.object({
        amount: z.number(),
      }),
    )
    .output(
      z.object({
        creditsKey: z.string(),
        credits: z.number(),
      }),
    )
    .mutation(async ({ ctx: { req }, input }) => {
      const ip = req.headers.get("x-forwarded-for") ?? req.ip;
      const creditsKey = `anonymous_credits:${ip}`;
      const credits = await redis.get<number>(creditsKey);
      const now = new Date();
      const endOfDay = new Date(now).setHours(24, 0, 0, 0) - now;
      const ttl = Math.ceil(endOfDay / 1000); // TTL in seconds until the end of the day

      if (credits == null) {
        // throw new Error("No credits available.");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No credits available.",
        });
      }

      const updatedCredits = credits + input.amount;
      if (updatedCredits < 0) {
        // throw new Error("Insufficient credits.");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Insufficient credits.",
        });
      }

      await redis.setex(creditsKey, ttl, updatedCredits);
      return {
        creditsKey: creditsKey,
        credits: updatedCredits,
      };
    }),
});

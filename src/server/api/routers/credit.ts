import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { type NextRequest } from "next/server";
import { redis } from "@/server/redis";

const userCreditsDefault = 10; // Example: 10 free credits per day
const anonymousCreditDefault = 5; // Example: 5 free credits per day

export async function getCredits(
  req: NextRequest | undefined,
  headers: Headers,
) {
  const ip =
    headers?.get("x-forwarded-for")?.split(",")[0] ??
    headers?.get("x-real-ip") ??
    req?.headers.get("x-forwarded-for")?.split(",")[0] ??
    req?.headers.get("x-real-ip") ??
    "127.0.0.1"; // fallback to localhost if no IP is found

  const creditsKey = `anonymous_credits:${ip}`;
  return {
    key: creditsKey,
    credits: await redis.get<number>(creditsKey),
  };
}

export async function getUserCredits(userId: string) {
  const creditsKey = `user_credits:${userId}`;
  return {
    key: creditsKey,
    credits: await redis.get<number>(creditsKey),
  };
}

function endOfDayTTL() {
  const now = new Date();
  const endOfDay = new Date(now).setHours(24, 0, 0, 0);
  // TTL in seconds until the end of the day
  return Math.ceil((endOfDay - now.getTime()) / 1000);
}

export const creditRouter = createTRPCRouter({
  getCredit: publicProcedure
    .output(
      z.object({
        creditsKey: z.string(),
        credits: z.number(),
      }),
    )
    .query(async ({ ctx: { req, headers, auth } }) => {
      const creditInfo = auth.userId
        ? await getUserCredits(auth.userId)
        : await getCredits(req, headers);

      let credits = creditInfo.credits;

      const now = new Date();
      const endOfDay = new Date(now).setHours(24, 0, 0, 0);
      // TTL in seconds until the end of the day
      const ttl = Math.ceil((endOfDay - now.getTime()) / 1000);

      if (credits == null) {
        // Allocate initial daily credits for a new user
        credits = auth.userId ? userCreditsDefault : anonymousCreditDefault;
        await redis.setex(creditInfo.key, ttl, credits);
      }

      return {
        creditsKey: creditInfo.key,
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
    .mutation(async ({ ctx: { req, headers, auth }, input }) => {
      const { key, credits } = auth.userId
        ? await getUserCredits(auth.userId)
        : await getCredits(req, headers);

      if (credits == null) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No credits available.",
        });
      }

      const updatedCredits = credits + input.amount;
      if (updatedCredits < 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Insufficient credits.",
        });
      }

      const ttl = endOfDayTTL();
      await redis.setex(key, ttl, updatedCredits);
      return {
        creditsKey: key,
        credits: updatedCredits,
      };
    }),
});

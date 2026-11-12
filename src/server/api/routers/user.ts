// user.ts
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema/users";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new Error("Not logged in");
    }

    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.auth.userId),
    });
  }),
});

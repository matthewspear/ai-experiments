import { articles } from "@/server/db/schema/articles";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { env } from "process";
import { createId } from "@paralleldrive/cuid2";
import { eq, desc, sql } from "drizzle-orm";

export const articleRouter = createTRPCRouter({
  getArticles: protectedProcedure.query(async ({ ctx: { auth, db } }) => {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.userId, auth.userId))
      .orderBy(desc(articles.updatedAt));
  }),
  getArticle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx: { auth, db } }) => {
      return await db
        .select()
        .from(articles)
        .where(
          sql`${articles.userId} = ${auth.userId} and ${articles.id} = ${input.id}`,
        )
        .limit(1);
    }),
  request: protectedProcedure
    .input(
      z.object({
        topic: z.string(),
        editMode: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx: { auth, db } }) => {
      const id = createId();

      await db.insert(articles).values({
        id: id,
        topic: input.topic,
        editMode: input.editMode,
        userId: auth.userId,
      });

      const url = String(env.MODAL_JOURNALIST_URL);

      const modalResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.MODAL_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          articleId: id,
          topic: input.topic,
          editMode: input.editMode,
        }),
      });
      console.log("Modal response", modalResponse.status);

      return { articleId: id };
    }),
});

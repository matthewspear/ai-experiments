import { db } from "@/server/db";
import { articles } from "@/server/db/schema/articles";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";
import { env } from "process";
import { articleSchema } from "./articleSchema";

export async function POST(req: NextRequest) {
  const headers = req.headers;
  if (headers.get("authorization") !== `Bearer ${env.MODAL_AUTH_TOKEN}`) {
    return Response.json({
      status: "Unauthorized",
      code: 401,
    });
  }

  console.log("Webhook received");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await req.json();
  console.log(data);

  const article = await articleSchema.parseAsync(data);

  await db
    .update(articles)
    .set({
      topic: article.topic,
      article: article.article,
      editedArticle: article.editedArticle,
      searchTerms: article.searchTerms,
      sources: article.sources,
    })
    .where(eq(articles.id, article.id));

  return Response.json({
    status: "ok",
    code: 200,
  });
}

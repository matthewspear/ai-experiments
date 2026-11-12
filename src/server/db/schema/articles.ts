import { boolean, json, text, varchar } from "drizzle-orm/mysql-core";
import { createdAt, cuid, mysqlTable, updatedAt, userIdRef } from "./schema";

export const articles = mysqlTable("article", {
  id: cuid,
  createdAt: createdAt,
  updatedAt: updatedAt,
  topic: varchar("topic", { length: 191 }).notNull(),
  editMode: boolean("editMode").default(false),
  article: text("article"),
  editedArticle: text("editedArticle"),
  searchTerms: json("searchTerms"),
  sources: json("sources"),
  userId: userIdRef,
});

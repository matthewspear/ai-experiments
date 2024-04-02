import { double, json, text, varchar } from "drizzle-orm/mysql-core";
import { createdAt, cuid, mysqlTable, updatedAt, userIdRef } from "./schema";

export const results = mysqlTable("result", {
  id: cuid,
  createdAt: createdAt,
  updatedAt: updatedAt,
  task: varchar("task", { length: 191 }).notNull(),
  model: varchar("model", { length: 191 }).notNull(),
  temperature: double("temperature").notNull(),
  userPrompt: text("userPrompt").notNull(),
  fullPrompt: text("fullPrompt").notNull(),
  response: json("response").notNull(),
  usage: json("usage"),
  userId: userIdRef,
});

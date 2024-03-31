import { boolean, varchar } from "drizzle-orm/mysql-core";
import { createdAt, mysqlTable, updatedAt } from "./schema";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: createdAt,
  updatedAt: updatedAt,
  softDelete: boolean("softDelete").default(false),
});

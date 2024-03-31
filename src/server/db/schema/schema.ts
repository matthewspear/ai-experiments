// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import {
  bigint,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => name);

export const cuid = varchar("id", { length: 128 })
  .primaryKey()
  .$defaultFn(() => createId());

export const createdAt = timestamp("createdAt").defaultNow().notNull();
export const updatedAt = timestamp("updatedAt")
  .defaultNow()
  .onUpdateNow()
  .notNull();

export const userIdRef = varchar("userId", { length: 255 });

export function serialRef(name: string) {
  return bigint(name, { mode: "number", unsigned: true });
}

export function cuidRef(name: string) {
  return varchar(name, { length: 128 });
}

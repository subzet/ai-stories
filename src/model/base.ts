import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const baseSchema = {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: text("deleted_at"),
};

export function enumType<T extends object>(enumValue: T) {
  return Object.keys(enumValue) as unknown as [keyof T, ...(keyof T)[]];
}

import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { baseSchema } from "./base";

export const user = sqliteTable("user", {
  ...baseSchema,
  name: text("name"),
  email: text("email").notNull(),
  externalId: text("external_id").notNull(),
});

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

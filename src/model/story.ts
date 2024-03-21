import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { baseSchema } from "./base";

export const story = sqliteTable("story", {
  ...baseSchema,
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("author_id").notNull(),
  parameters: text("parameters").notNull(),
});

export const insertStorySchema = createInsertSchema(story);
export const selectStorySchema = createSelectSchema(story);

export type Story = z.infer<typeof selectStorySchema>;
export type InsertStory = z.infer<typeof insertStorySchema>;

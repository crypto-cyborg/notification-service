import type { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notification = sqliteTable("notifications", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  text: text("text"),
  createdAt: integer("created_at").notNull()
})

export type Notification = InferSelectModel<typeof notification>;


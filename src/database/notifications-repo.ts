import { GetDatabase } from ".";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

export async function getUserNotifications(
  userId: string,
): Promise<schema.Notification[]> {
  const db = GetDatabase();
  const res = await db
    .select()
    .from(schema.notification)
    .where(eq(schema.notification.userId, userId));

  return res;
}

export async function InsertNotification(n: schema.Notification): Promise<schema.Notification | undefined> {
  const db = GetDatabase();
  const res = await db
    .insert(schema.notification)
    .values(n)
    .returning();

  if (res.length === 0) {
    return undefined;
  }

  return res[0];
}

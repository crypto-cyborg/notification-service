import { getUserNotifications } from "@/src/database/notifications-repo";
import type { Context } from "hono";

export async function userNotificationsHandler(c: Context) {
  const userId = c.req.param("userId")
  const notifications = await getUserNotifications(userId)

  return c.json(notifications);
}

export default userNotificationsHandler;

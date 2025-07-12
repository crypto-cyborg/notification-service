import { type Context, Hono } from "hono";
import { getUserNotifications } from "../database/notifications-repo";

const app = new Hono();

app.get("/:userId", async (c: Context) => {
  const userId = c.req.param("userId")
  const notifications = await getUserNotifications(userId)

  return c.json(notifications);
});

app.post("/", async (c: Context) => {
  const body = await c.req.json();
});

export default app;

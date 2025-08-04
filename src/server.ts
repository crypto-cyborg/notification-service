import { Hono, type Context } from "hono";
import notifications from "./routes/notifications";
import { initializeEmailsQueue } from "./messaging/notifications-queue";

const app = new Hono();

await initializeEmailsQueue()

app.get("/healthcheck", (c: Context) => {
  return c.json({ status: "ok" });
});

app.route("api/notifications", notifications)

export default {
  port: 42069,
  fetch: app.fetch,
};

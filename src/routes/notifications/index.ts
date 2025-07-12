import { Hono } from "hono";
import userNotificationsHandler from "./user-notifications-handler";

const app = new Hono();

app.get("/:userId", userNotificationsHandler)

export default app;

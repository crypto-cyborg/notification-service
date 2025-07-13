import { Hono, } from "hono";
import userNotificationsHandler from "./user-notifications-handler";
import { sendEmailsHandler } from "./send-emails-handler";

const app = new Hono();

app.get("/:userId", userNotificationsHandler)
app.post("/emails", sendEmailsHandler);

export default app;

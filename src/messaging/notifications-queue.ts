import type { ConsumeMessage } from "amqplib";
import { GetChannel } from "./index";
import { sendEmail, type IEmailOptions } from "../services/email-sender";
import type { Notification } from "../database/schema";
import { InsertNotification } from "../database/notifications-repo";
import type { NotificationBody } from "./types";
import { getLogger } from "../middlewares/logging";

export interface IQueueItem {
  userId: string;
  createdAt: number;
  body: NotificationBody;
}

export async function initializeEmailsQueue() {
  const logger = getLogger();
  const chan = await GetChannel();

  if (!chan) {
    return;
  }

  const q = await chan.assertQueue("", { durable: true });

  chan.bindQueue(q.queue, "notification-service", "email.#");
  chan.consume(q.queue, async (msg: ConsumeMessage | null) => {
    const json = msg?.content.toString();
    if (!json) {
      throw new Error("message content is empty");
    }

    const obj: IQueueItem = JSON.parse(json);
    const body = obj.body as IEmailOptions;

    logger.debug(obj)

    await sendEmail(body);

    const notification: Omit<Notification, "id"> = {
      userId: obj.userId,
      title: `Notification via email: ${body.subject}`,
      text: body.html || body.text || "",
      createdAt: obj.createdAt,
    };
    InsertNotification(notification);

    logger.info(`Sent email to ${body.to}`);
  });
}

import type { ConsumeMessage } from "amqplib"
import { GetChannel } from "./index"
import { sendEmail, type IEmailOptions } from "../services/email-sender"

export async function initializeEmailsQueue() {
  const chan = await GetChannel()

  if (!chan) {
    return
  }

  const q = await chan.assertQueue("", { durable: true })

  chan.bindQueue(q.queue, "notification-service", "email.#")
  chan.consume(q.queue, async (msg: ConsumeMessage | null) => {
    const json = msg?.content.toString()
    if (!json) {
      throw new Error("message content is empty")
    }

    const obj: IEmailOptions = JSON.parse(json)
    console.log(obj)

    await sendEmail(obj)
    console.log(`Sent email to ${obj.to}`)
  })
}

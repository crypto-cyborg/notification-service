import amqp from "amqplib"
import { env } from "../lib/environment"

let connection: amqp.ChannelModel | null = null;

export async function GetChannel(): Promise<amqp.Channel | undefined> {
  try {
    if (!connection) {
      connection = await amqp.connect(env.RABBIT_HOST)
    }

    const chan = await connection.createChannel()
    chan.assertExchange("notification-service", "topic", { durable: true })

    return chan
  } catch (err) {
    // TODO
    connection = null
    console.error("unable to create channel: ", err)
  }
}

export async function CloseConnection() {
  try {
    await connection?.close()
    connection = null
  } catch (err) {
    console.error("unable to close connection: ", err)
  }
}

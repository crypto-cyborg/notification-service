import nodemailer, { type SentMessageInfo } from "nodemailer";
import { env } from "@/src/lib/environment";

export interface IEmailOptions {
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: 587,
  secure: false,
  pool: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export async function sendEmail(
  options: IEmailOptions,
): Promise<SentMessageInfo> {
  const info = await transporter.sendMail({
    from: env.SMTP_USER,
    subject: options.subject,
    to: options.to,
    text: options.text,
    html: options.html
  });

  return info;
}

import { sendEmail, type IEmailOptions } from "@/src/services/email-sender";
import { z } from "zod";
import type { Context } from "hono";
import { NewApiError } from "@/src/lib/api";

const emailOptionsSchema = z.object({
  to: z.array(z.string().check(z.email())),
  subject: z.string().min(1),
  text: z.string().optional(),
  html: z.string().optional(),
});

export async function sendEmailsHandler(c: Context) {
  try {
    const emailOpts = await c.req.json<IEmailOptions>();
    const parsed = emailOptionsSchema.safeParse(emailOpts);

    if (!parsed.success) {
      return c.json(
        NewApiError("Invalid email options", JSON.parse(parsed.error.message)),
        400,
      );
    }

    const info = await sendEmail(parsed.data);

    return c.json(info);
  } catch (error) {
    // TODO: better error handling
    c.json(NewApiError("Unexpected error... Failed to send email", error), 500);
  }
}

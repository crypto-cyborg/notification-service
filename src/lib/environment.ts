import { z } from 'zod';

const envSchema = z.object({
  SMTP_HOST: z.string().min(1, 'SMTP host is required'),
  SMTP_PORT: z.number().int().positive().default(587),
  SMTP_USER: z.string().nonempty(),
  SMTP_PASSWORD: z.string().nonempty(),

  RABBIT_HOST: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().positive().default(5000),
  MONGODB_URI: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(8),
  FRONTEND_URL: z.string().url().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.errors);
  process.exit(1);
}

export const env = parsed.data;

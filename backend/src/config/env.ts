import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(8),
  FRONTEND_URL: z.string().url().optional()
});

export const env = envSchema.parse(process.env);

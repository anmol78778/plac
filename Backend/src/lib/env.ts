import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// .coerce.number() converts string values from .env into numbers

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3001),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "CLERK_PUBLISHABLE_KEY is required"),

  CLERK_SECRET_KEY: z
    .string()
    .min(1, "CLERK_SECRET_KEY is required"),

  CLERK_WEBHOOK_SECRET: z.string().optional(),

  FRONTEND_URL: z
    .string()
    .url("FRONTEND_URL must be a valid URL"),

  POLAR_ACCESS_TOKEN: z.string().optional(),

  POLAR_WEBHOOK_SECRET: z.string().optional(),

  POLAR_API_BASE: z
    .string()
    .url("POLAR_API_BASE must be a valid URL")
    .default("https://api.polar.sh"),

  POLAR_CHECKOUT_PRODUCT_ID: z
    .string()
    .uuid("POLAR_CHECKOUT_PRODUCT_ID must be a valid UUID"),

  STREAM_API_KEY: z
    .string()
    .min(1, "STREAM_API_KEY is required"),

  STREAM_API_SECRET: z
    .string()
    .min(1, "STREAM_API_SECRET is required"),

  IMAGEKIT_PUBLIC_KEY: z
    .string()
    .min(1, "IMAGEKIT_PUBLIC_KEY is required"),

  IMAGEKIT_PRIVATE_KEY: z
    .string()
    .min(1, "IMAGEKIT_PRIVATE_KEY is required"),

  IMAGEKIT_URL_ENDPOINT: z
    .string()
    .url("IMAGEKIT_URL_ENDPOINT must be a valid URL"),

  SENTRY_DSN: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("\n❌ Invalid environment variables:\n");

    parsed.error.issues.forEach((issue) => {
      console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    });

    process.exit(1);
  }

  return parsed.data;
}

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = loadEnv();
  }

  return cachedEnv;
}
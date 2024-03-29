import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    TYPESENSE_API_KEY: z.string().min(1),
    TYPESENSE_URL: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    TYPESENSE_API_KEY: process.env.TYPESENSE_API_KEY,
    TYPESENSE_URL: process.env.TYPESENSE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

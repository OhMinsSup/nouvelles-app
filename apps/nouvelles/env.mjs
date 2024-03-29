import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
    SITE_URL: z.string().min(1).default('http://localhost:3000'),
    API_PREFIX: z.string().min(1).default('/api'),
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  server: {
    DEPLOY_GROUP: z.enum(['development', 'local', 'production']),
    KAKAO_CLIENT_ID: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    KAKAO_CLIENT_SECRET: z.string().min(1),
    KAKAO_SDK_CLIENT_ID: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    FLY_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    // server
    NODE_ENV: process.env.NODE_ENV,
    DEPLOY_GROUP: process.env.DEPLOY_GROUP,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    KAKAO_SDK_CLIENT_ID: process.env.KAKAO_SDK_CLIENT_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    FLY_APP_URL: process.env.FLY_APP_URL,
    CI: process.env.CI,
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
    // client
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
});

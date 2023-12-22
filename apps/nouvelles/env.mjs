import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DEPLOY_GROUP: z.enum(['development', 'local', 'production']),
    KAKAO_CLIENT_ID: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    KAKAO_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string(),
    NEXT_PUBLIC_API_HOST: z.string(),
    NEXT_PUBLIC_ROOT_DOMAIN: z.string(),
  },
  runtimeEnv: {
    // server
    NODE_ENV: process.env.NODE_ENV,
    DEPLOY_GROUP: process.env.DEPLOY_GROUP,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    // client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
});

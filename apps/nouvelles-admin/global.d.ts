declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DEPLOY_GROUP: 'development' | 'production' | 'local';
      KAKAO_CLIENT_ID: string;
      KAKAO_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
      DATABASE_URL: string;
      REDIS_URL: string;

      SITE_URL: string;
      API_PREFIX: string;

      SKIP_ENV_VALIDATION: string | undefined;

      CI: string | undefined;
      PORT: string | undefined;
      VERCEL_URL: string | undefined;
    }
  }
}

interface Window extends globalThis {
  __DOMAIN_INFO__: {
    host: string;
    protocol: string;
    isLocalhost: boolean;
    domainUrl: string;
  };

  __ENV__: {
    SITE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  };
}

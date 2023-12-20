declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DEPLOY_GROUP: 'development' | 'production' | 'local';
      NEXTAUTH_SECRET: string;
      KAKAO_CLIENT_ID: string;
      KAKAO_CLIENT_SECRET: string;
      DATABASE_URL: string;

      NEXT_PUBLIC_AXIOM_TOKEN: string;
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_API_HOST: string;
      NEXT_PUBLIC_ROOT_DOMAIN: string;

      VERCEL_URL: string | undefined;
      VERCEL_ENV: string | undefined;
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
    API_HOST: string;
    NODE_ENV: 'development' | 'production' | 'test';
  };
}

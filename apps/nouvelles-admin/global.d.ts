declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DEPLOY_GROUP: "development" | "production" | "local";

      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_API_HOST: string;
      NEXT_PUBLIC_ROOT_DOMAIN: string;
    }
  }
}

declare namespace FetchSchema {
  export type Body = BodyInit | Record<string, any> | null | undefined;

  export type Flag = {
    v1?: boolean;
  };

  export type ApiRoutes = URL | RequestInfo;

  export type ApiCustomOptions = {
    flag?: Flag;
    withAuthorization?: boolean;
  };

  export type ApiOptions = {
    requestInit?: RequestInit;
    request?: Request;
    customOptions?: ApiCustomOptions;
  };
}

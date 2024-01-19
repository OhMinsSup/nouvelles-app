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
      KAKAO_SDK_CLIENT_ID: string;

      SITE_URL: string;
      API_PREFIX: string;

      SKIP_ENV_VALIDATION: string | undefined;

      CI: string | undefined;
      PORT: string | undefined;
      VERCEL_URL: string | undefined;
    }
  }
}

declare namespace Kakao {
  namespace Share {
    interface ShareSettings {
      container: string | HTMLElement;
      templateId: number;
      templateArgs?: Record<string, any>;
      installTalk?: boolean;
      serverCallbackArgs?: Record<string, any> | string;
    }

    interface LinkObject {
      webUrl?: string;
      mobileWebUrl?: string;
      androidExecutionParams?: string;
      iosExecutionParams?: string;
    }

    interface ContentObject {
      title: string;
      imageUrl: string;
      link: LinkObject;
      imageWidth?: number;
      imageHeight?: number;
      description?: string;
    }

    interface ButtonObject {
      title: string;
      link: LinkObject;
    }

    interface DefaultListSettings {
      objectType: string;
      headerTitle: string;
      headerLink: LinkObject;
      contents: ContentObject[];
      buttonTitle?: string;
      buttons?: ButtonObject[];
      installTalk?: boolean;
      serverCallbackArgs?: Record<string, any> | string;
    }

    function cleanup(): void;
    function createCustomButton(e: ShareSettings): void;
    function createDefaultButton(
      e: DefaultListSettings & { container: string | HTMLElement },
    ): void;
    function sendCustom(e: Omit<ShareSettings, 'container'>): void;
    function sendDefault(e: DefaultListSettings): void;
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

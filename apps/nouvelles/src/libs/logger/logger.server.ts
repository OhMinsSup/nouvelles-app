'server-only';
import { getHeaderInDomainInfo } from '~/libs/domain/domain.server';
import { env } from 'env.mjs';
import { SentryLogger } from './logger.sentry';
import type { LogMethodParams, LoggerService } from './types';

export class ServerLogger extends SentryLogger implements LoggerService {
  info({ message, label, extra, request }: LogMethodParams) {
    if (env.NODE_ENV !== 'production') {
      console.info(`[${label}]:${message}`, extra);
      return;
    }

    const isServer = typeof window === 'undefined';

    if (isServer) {
      if (env.NODE_ENV === 'production' && request) {
        const { isLocalhost } = getHeaderInDomainInfo(request?.headers);
        if (request.log && !isLocalhost) {
          request.log.info(`[${label}]:${message}`, extra);
        }
      }
    }
  }

  debug({ message, label, extra, request }: LogMethodParams) {
    if (env.NODE_ENV !== 'production') {
      console.debug(`[${label}]:${message}`, extra);
      return;
    }

    const isServer = typeof window === 'undefined';

    if (isServer) {
      if (env.NODE_ENV === 'production' && request) {
        const { isLocalhost } = getHeaderInDomainInfo(request?.headers);
        if (request.log && !isLocalhost) {
          request.log.debug(`[${label}]:${message}`, extra);
        }
      }
    }
  }

  log({ message, label, extra }: LogMethodParams) {
    console.log(`[${label}]:${message}`, extra);
  }

  warn({ message, label, extra, request }: LogMethodParams) {
    if (env.NODE_ENV !== 'production') {
      console.warn(`[${label}]:${message}`, extra);
      return;
    }

    const isServer = typeof window === 'undefined';

    if (isServer) {
      if (env.NODE_ENV === 'production' && request) {
        const { isLocalhost } = getHeaderInDomainInfo(request?.headers);
        if (request.log && !isLocalhost) {
          request.log.warn(`[${label}]:${message}`, extra);
        }
      }

      this.scope();
    }
  }

  error({ message, label, extra, error, request }: LogMethodParams) {
    if (env.NODE_ENV !== 'production') {
      console.error(`[${label}]:${message}`, {
        error,
        extra,
      });
      return;
    }

    const isServer = typeof window === 'undefined';

    if (isServer) {
      if (env.NODE_ENV === 'production' && request) {
        const { isLocalhost } = getHeaderInDomainInfo(request?.headers);
        if (request.log && !isLocalhost) {
          request.log.error(`[${label}]:${message}`, {
            error,
            extra,
          });
        }
      }

      this.scope();
    }
  }
}

export const $logger = new ServerLogger();

import { log } from 'next-axiom';
import { getLocationInDomainInfo } from '~/libs/domain/domain.client';
import { SentryLogger } from './logger.sentry';
import type { LogMethodParams, LoggerService } from './types';

export class ClientLogger extends SentryLogger implements LoggerService {
  info({ message, label, extra }: LogMethodParams) {
    if (window.__ENV__.NODE_ENV !== 'production') {
      console.info(
        `%c[${label}]:${message}`,
        'color: #fff; background-color: #28a745; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
      return;
    }

    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      if (window.__ENV__.NODE_ENV === 'production') {
        const { isLocalhost } = getLocationInDomainInfo(location);
        if (!isLocalhost) {
          log.info(`[${label}]:${message}`, extra);
        }
      }
    }
  }

  debug({ message, label, extra }: LogMethodParams) {
    if (window.__ENV__.NODE_ENV !== 'production') {
      console.debug(
        `%c[${label}]${message}`,
        'color: #fff; background-color: #17a2b8; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
      return;
    }

    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      if (window.__ENV__.NODE_ENV === 'production') {
        const { isLocalhost } = getLocationInDomainInfo(location);
        if (!isLocalhost) {
          log.debug(`[${label}]:${message}`, extra);
        }
      }
    }
  }

  log({ message, label, extra }: LogMethodParams) {
    console.log(
      `%c[${label}]:${message}`,
      'color: #fff; background-color: #17a2b8; padding: 2px 4px; border-radius: 4px;',
      extra,
    );
  }

  warn({ message, label, extra }: LogMethodParams) {
    if (window.__ENV__.NODE_ENV !== 'production') {
      console.warn(
        `%c[${label}]:${message}`,
        'color: #fff; background-color: #ffc107; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
      return;
    }

    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      if (window.__ENV__.NODE_ENV === 'production') {
        const { isLocalhost } = getLocationInDomainInfo(location);
        if (!isLocalhost) {
          log.warn(`[${label}]:${message}`, extra);
        }
      }

      this.scope();
    }
  }

  error({ message, label, extra, error }: LogMethodParams) {
    if (window.__ENV__.NODE_ENV !== 'production') {
      console.error(
        `%c[${label}]:${message}`,
        'color: #fff; background-color: #ffc107; padding: 2px 4px; border-radius: 4px;',
        {
          error,
          extra,
        },
      );
      return;
    }

    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      if (window.__ENV__.NODE_ENV === 'production') {
        const { isLocalhost } = getLocationInDomainInfo(location);
        if (!isLocalhost) {
          log.error(`[${label}]:${message}`, {
            error,
            extra,
          });
        }
      }

      this.scope();
    }
  }
}

export const logger = new ClientLogger();

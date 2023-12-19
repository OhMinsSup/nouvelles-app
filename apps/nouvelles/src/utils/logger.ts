import { isBrowser } from '@nouvelles/react';

type LogCategory =
  | 'client'
  | 'server'
  | 'api'
  | 'db'
  | 'middleware'
  | 'pages'
  | 'components'
  | 'logging';

type Extra = Record<string, any>;

class Logger {
  info(label: LogCategory, message: string, extra?: Extra) {
    if (isBrowser) {
      console.info(
        `%c[${label}]:${message}`,
        'color: #fff; background-color: #28a745; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
    } else {
      console.info(`[${label}]:${message}`, extra);
    }
  }

  debug(label: LogCategory, message: string, extra?: Extra) {
    if (isBrowser) {
      console.debug(
        `%c[${label}]${message}`,
        'color: #fff; background-color: #17a2b8; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
    } else {
      console.debug(`[${label}]:${message}`, extra);
    }
  }

  log(label: LogCategory, message: string, extra?: Extra) {
    if (isBrowser) {
      console.log(
        `%c[${label}]:${message}`,
        'color: #fff; background-color: #17a2b8; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
    } else {
      console.log(`[${label}]:${message}`, extra);
    }

    // if (sentryDSN) {
    //   Sentry.withScope(function (scope) {
    //     scope.setLevel('log');
    //     for (const key in extra) {
    //       scope.setExtra(key, extra[key]);
    //     }
    //     Sentry.captureMessage(message);
    //   });
    // }
  }

  warn(message: string, extra?: Extra) {
    // if (sentryDSN) {
    //   Sentry.withScope(function (scope) {
    //     scope.setLevel('warning');

    //     for (const key in extra) {
    //       scope.setExtra(key, extra[key]);
    //     }

    //     Sentry.captureMessage(message);
    //   });
    // }

    if (isBrowser) {
      console.warn(
        `%c[warning]:${message}`,
        'color: #fff; background-color: #ffc107; padding: 2px 4px; border-radius: 4px;',
        extra,
      );
    } else {
      console.warn(`[warning]:${message}`, extra);
    }
  }

  error(error: Error, message?: string, extra?: Extra) {
    // if (sentryDSN) {
    //   Sentry.withScope(function (scope) {
    //     scope.setLevel('error');

    //     for (const key in extra) {
    //       scope.setExtra(key, extra[key]);
    //     }

    //     Sentry.captureException(error);
    //   });
    // }
    console.error({
      error,
      message,
      extra,
    });
  }
}

export default new Logger();

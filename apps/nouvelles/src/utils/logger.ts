// import { env } from 'env.mjs';

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
    // if (env.NODE_ENV === 'production' && env.NEXT_PUBLIC_AXIOM_TOKEN) {
    //   log.info(`[${label}]:${message}`, extra);
    //   return;
    // }

    if (typeof window !== 'undefined') {
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
    // if (env.NODE_ENV === 'production' && env.NEXT_PUBLIC_AXIOM_TOKEN) {
    //   log.debug(`[${label}]:${message}`, extra);
    //   return;
    // }

    if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined') {
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
    // if (env.NODE_ENV === 'production' && env.NEXT_PUBLIC_AXIOM_TOKEN) {
    //   log.warn(`[warning]:${message}`, extra);
    //   return;
    // }
    // if (sentryDSN) {
    //   Sentry.withScope(function (scope) {
    //     scope.setLevel('warning');

    //     for (const key in extra) {
    //       scope.setExtra(key, extra[key]);
    //     }

    //     Sentry.captureMessage(message);
    //   });
    // }

    if (typeof window !== 'undefined') {
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
    // if (env.NODE_ENV === 'production' && env.NEXT_PUBLIC_AXIOM_TOKEN) {
    //   log.error(`[error]:${error.name}`, {
    //     error,
    //     message,
    //     extra,
    //   });
    //   return;
    // }
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

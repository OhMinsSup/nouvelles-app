// You can also use CommonJS `require('@sentry/node')` instead of `import`
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { envVars } from '~/env';

if (envVars.SENTRY_DSN) {
  Sentry.init({
    dsn: envVars.SENTRY_DSN,
    integrations: [new ProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
    ignoreErrors: [
      // These errors are expected in normal running of the application and
      // don't need to be reported.
    ],
  });
}

export default Sentry;

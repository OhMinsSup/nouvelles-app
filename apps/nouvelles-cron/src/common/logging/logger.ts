import { Logger, consoleTransport, sentryTransport } from '@nouvelles/logger';
import { envVars } from '~/env';
import Sentry from './sentry';

export const logger = new Logger();

logger.addTransport(consoleTransport);

if (envVars.SENTRY_DSN) {
  logger.addTransport(sentryTransport(Sentry));
}

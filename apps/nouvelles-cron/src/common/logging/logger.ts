import {
  Logger,
  consoleTransport,
  sentryTransport,
  axiomTransport,
} from '@nouvelles/logger';
import { envVars } from '~/env';
import Sentry from './sentry';
import { axiom } from './axiom';

export const logger = new Logger();

logger.addTransport(consoleTransport);

if (envVars.SENTRY_DSN && envVars.NODE_ENV === 'production') {
  logger.addTransport(sentryTransport(Sentry));
}

if (axiom && envVars.NODE_ENV === 'production') {
  logger.addTransport(axiomTransport(axiom));
}

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

if (envVars.SENTRY_DSN) {
  logger.addTransport(sentryTransport(Sentry));
}

if (envVars.AXIOM_TOKEN && envVars.AXIOM_ORG_ID) {
  logger.addTransport(axiomTransport(axiom));
}

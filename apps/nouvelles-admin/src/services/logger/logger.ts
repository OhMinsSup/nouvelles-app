import { Logger, consoleTransport } from '@nouvelles/logger';

export const logger = new Logger();

logger.addTransport(consoleTransport);

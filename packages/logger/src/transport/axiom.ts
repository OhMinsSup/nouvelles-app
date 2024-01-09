import { LogLevel } from '../constants';
import {
  ContentType,
  type AxiomWithoutBatching,
  ContentEncoding,
} from '@axiomhq/js';
import type { Transport } from '../types';
import { prepareMetadata } from '../utils';

const dataset = 'cron-server';

export const axiomTransport =
  (axiom: AxiomWithoutBatching): Transport =>
  (level, message, { type, tags, ...metadata }, timestamp) => {
    const meta = prepareMetadata(metadata);

    /**
     * If a string, report a breadcrumb
     */
    if (typeof message === 'string') {
      /**
       * Send all higher levels with `captureMessage`, with appropriate severity
       * level
       */
      if (
        level === LogLevel.Error ||
        level === LogLevel.Warn ||
        level === LogLevel.Log
      ) {
        const messageLevel =
          {
            [LogLevel.Log]: 'log',
            [LogLevel.Warn]: 'warning',
            [LogLevel.Error]: 'error',
          }[level] || 'log';

        // Defer non-critical messages so they're sent in a batch
        queueMessageForAxiom(axiom, message, {
          type,
          level: messageLevel,
          tags,
          extra: meta,
          timestamp: timestamp / 1000, // Sentry expects seconds
        });
      }
    } else {
      /**
       * It's otherwise an Error and should be reported with captureException
       */
      const data = JSON.stringify([
        {
          type,
          level,
          tags,
          extra: meta,
          timestamp: timestamp / 1000, // Sentry expects seconds
        },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      try {
        void axiom.ingestRaw(
          dataset,
          data,
          ContentType.JSON,
          ContentEncoding.Identity,
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

const queuedMessages: [string, any][] = [];
let sentrySendTimeout: ReturnType<typeof setTimeout> | null = null;
function queueMessageForAxiom(
  axiom: AxiomWithoutBatching,
  message: string,
  captureContext: any,
) {
  queuedMessages.push([message, captureContext]);
  if (!sentrySendTimeout) {
    // Throttle sending messages with a leading delay
    // so that we can get Sentry out of the critical path.
    sentrySendTimeout = setTimeout(() => {
      sentrySendTimeout = null;
      sendQueuedMessages(axiom);
    }, 7000);
  }
}
function sendQueuedMessages(axiom: AxiomWithoutBatching) {
  while (queuedMessages.length > 0) {
    const record = queuedMessages.shift();
    if (record) {
      const [message, ctx] = record as [string, Record<string, any>];
      const data = JSON.stringify([
        {
          message,
          ...ctx,
        },
      ]);

      try {
        void axiom.ingestRaw(
          dataset,
          data,
          ContentType.JSON,
          ContentEncoding.Identity,
        );
      } catch (error) {
        console.error(error);
      }
    }
  }
}

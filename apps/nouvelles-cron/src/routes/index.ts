import { container } from 'tsyringe';
import type { FastifyPluginCallback } from 'fastify';
import { CommonService } from '~/services/common.service';
import items from './items';
import Sentry from '~/common/logging/sentry';
import { logger } from '~/common/logging/logger';

const api: FastifyPluginCallback = (fastify, opts, done) => {
  const commonService = container.resolve(CommonService);

  fastify.register(items, { prefix: '/items' });

  fastify.post('/error-test', async (_request, reply) => {
    try {
      const transaction = Sentry.startTransaction({
        op: 'test',
        name: 'My First Test Transaction',
      });

      try {
        const error = new Error('Test error');
        throw error;
      } catch (e) {
        if (e instanceof Error) {
          logger.error(e);
        }

        Sentry.captureException(e);
      } finally {
        transaction.finish();
      }

      reply.send({ ok: true });
    } catch (error) {
      reply.status(500).send({ ok: false });
    }
  });

  fastify.get('/ping', (_request, reply) => {
    const serverTime = commonService.getServerTime();
    reply.send({ serverTime });
  });

  fastify.get('/healthcheck', async (_request, reply) => {
    try {
      await commonService.healthcheck();
      reply.send({ ok: true });
    } catch (error) {
      reply.status(500).send({ ok: false });
    }
  });

  done();
};

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', (_request, reply) => {
    reply.send({ ok: true });
  });

  fastify.register(api, {
    prefix: '/api',
  });

  done();
};

export default routes;

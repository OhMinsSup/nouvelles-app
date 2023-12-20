import { container } from 'tsyringe';
import type { FastifyPluginCallback } from 'fastify';
import { CommonService } from '~/services/common.service';
import items from './items';

const api: FastifyPluginCallback = (fastify, opts, done) => {
  const commonService = container.resolve(CommonService);

  fastify.register(items, { prefix: '/items' });

  fastify.get('/ping', (request, reply) => {
    const serverTime = commonService.getServerTime();
    reply.send({ serverTime });
  });

  fastify.get('/healthcheck', async (request, reply) => {
    try {
      await commonService.healthcheck();
      reply.send({ ok: true });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ ok: false });
    }
  });

  done();
};

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', (request, reply) => {
    reply.send({ ok: true });
  });

  fastify.register(api, {
    prefix: '/api',
  });

  done();
};

export default routes;

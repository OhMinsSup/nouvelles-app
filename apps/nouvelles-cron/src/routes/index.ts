import dayjs from 'dayjs';
import type { FastifyPluginCallback } from 'fastify';
import items from './items';

const api: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(items, { prefix: '/items' });

  fastify.get('/ping', (request, reply) => {
    const now = new Date();
    const serverTime = dayjs(now).format('yyyy-MM-DD HH:mm:ss');
    reply.send({ serverTime });
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

import type { FastifyPluginCallback } from 'fastify';

const checkApiKeyPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.addHook('preHandler', (request, _reply, __done) => {
    const whitelist = ['/', '/api/ping', '/api/healthcheck'];
    if (whitelist.includes(request.url)) {
      __done();
    }

    const apiKey = request.headers['X-API-KEY'] as string;
    if (!apiKey || process.env.apiKey !== apiKey) {
      throw new Error('Invalid cron api key');
    }

    __done();
  });
  done();
};

export default checkApiKeyPlugin;

import { NeusralSite } from '@nouvelles/model';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';

const items: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/collect/neusral', async (request: FastifyRequest, reply) => {
    const site = new NeusralSite();

    try {
      const items = await site.run();
      console.log(items);
      reply.status(200).send({
        ok: true,
        items,
      });
    } catch (error) {
      console.error(error);
    } finally {
      site.close();

      reply.status(500).send({
        ok: false,
        items: [],
      });
    }
  });
  done();
};

export default items;

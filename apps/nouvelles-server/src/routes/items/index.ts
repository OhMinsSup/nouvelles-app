import { NeusralSite } from '@nouvelles/model';
import { container } from 'tsyringe';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { ItemsService } from '../../services/items.service';

const items: FastifyPluginCallback = (fastify, opts, done) => {
  const itemsService = container.resolve(ItemsService);

  fastify.post('/collect/neusral', async (request: FastifyRequest, reply) => {
    const site = new NeusralSite();

    try {
      const data = await site.run();
      const items = await itemsService.generateItems(data);
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
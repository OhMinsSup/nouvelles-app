import { NeusralSite } from '@nouvelles/model';
import { container } from 'tsyringe';
import dayjs from 'dayjs';
import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { ItemsService } from '~/services/items.service';

const items: FastifyPluginCallback = (fastify, opts, done) => {
  const itemsService = container.resolve(ItemsService);

  fastify.post('/collect/neusral', async (request: FastifyRequest, reply) => {
    const today = dayjs().startOf('day').toDate();

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      reply.status(200).send({
        ok: true,
        items: [],
        message: 'Already has today item',
      });
      return;
    }

    const site = new NeusralSite();

    try {
      const data = await site.run();
      const result = await itemsService.generateItems(data, today);
      reply.status(200).send({
        ok: true,
        items: result,
        message: 'Completed items job',
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        ok: false,
        items: [],
        message: 'Failed items job',
      });
    } finally {
      site.close();
    }
  });
  done();
};

export default items;

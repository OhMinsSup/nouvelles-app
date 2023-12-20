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

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      const data = await site.run();
      result.push(...data);
      console.log('Completed items job');
    } catch (error) {
      console.error(error);
    } finally {
      site.close();
      console.log('Completed items job');
    }

    try {
      const data = await itemsService.generateItems(result, today);
      reply.status(200).send({
        ok: true,
        items: data,
        message: 'Completed items job',
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        ok: false,
        items: [],
        message: 'Failed items job',
      });
    }
  });

  done();
};

export default items;

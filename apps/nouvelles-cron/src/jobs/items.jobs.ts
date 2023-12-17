import { NeusralSite } from '@nouvelles/model';
import { injectable, singleton, container } from 'tsyringe';
import dayjs from 'dayjs';
import { ItemsService } from '~/services/items.service';
import { type Job, JobProgress } from '~/jobs/job';

@injectable()
@singleton()
export class ItemsJob extends JobProgress implements Job {
  public async runner() {
    const itemsService = container.resolve(ItemsService);
    console.log('Starting items job');
    const today = dayjs().startOf('day').toDate();

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      console.log('Already has today item');
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      const data = await site.run();
      result.push(...data);
      console.log('items job =>>>', data.length);
    } catch (error) {
      console.error(error);
    } finally {
      site.close();
      console.log('Completed items job');
    }

    try {
      console.log('generateItems =>>>', result.length);
      await itemsService.generateItems(result, today);
      console.log('Completed generateItems');
    } catch (error) {
      console.error(error);
      console.log('Failed generateItems');
    }
  }
}

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

    const executablePath =
      process.env.NODE_ENV === 'production' ? '/usr/bin/chromium' : undefined;

    const test = new NeusralSite();
    const testData = await test.run(executablePath);
    console.log('[result] ====>', testData);

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      console.log('Already has today item');
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      const data = await site.run(executablePath);
      result.push(...data);
      console.log('Completed items job');
    } catch (error) {
      console.error(error);
    } finally {
      site.close();
      console.log('Completed items job');
    }

    try {
      await itemsService.generateItems(result, today);
      console.log('Completed generateItems');
    } catch (error) {
      console.error(error);
      console.log('Failed generateItems');
    }
  }
}

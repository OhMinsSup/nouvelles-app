import { NeusralSite } from '@nouvelles/model';
import { ItemsService } from '../services/items.service';
import { injectable, singleton } from 'tsyringe';

abstract class Job {
  public async runner(): Promise<void> {}
}

class JobProgress {
  private isProgress = false;
  public get isProgressing() {
    return this.isProgress;
  }
  public start() {
    this.isProgress = true;
  }
  public stop() {
    this.isProgress = false;
  }
}

@singleton()
@injectable()
export class ItemsJob extends JobProgress implements Job {
  constructor(private readonly itemsService: ItemsService) {
    super();
  }

  public async runner() {
    console.log('Starting items job');
    console.time('items job');
    const site = new NeusralSite();

    try {
      const data = await site.run();
      await this.itemsService.generateItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      site.close();
      console.timeEnd('items job');
      console.log('Completed items job');
    }
  }
}

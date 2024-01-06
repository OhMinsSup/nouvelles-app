import { db } from '@nouvelles/database';
import { formatDate } from '@nouvelles/date';
import { injectable, singleton } from 'tsyringe';

interface Service {
  getServerTime: () => string;
  healthcheck: () => Promise<any>;
}

@singleton()
@injectable()
export class CommonService implements Service {
  public getServerTime() {
    try {
      const serverTime = new Date();
      return formatDate(serverTime);
    } catch (error) {
      return 'Invalid date instance';
    }
  }

  public async healthcheck() {
    await db.$queryRaw`SELECT 1`;
  }
}

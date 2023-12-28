import { db } from '@nouvelles/database';
import dayjs from 'dayjs';
import { injectable, singleton } from 'tsyringe';

interface Service {
  getServerTime: () => string;
  healthcheck: () => Promise<any>;
}

@singleton()
@injectable()
export class CommonService implements Service {
  public getServerTime() {
    const now = new Date();
    const serverTime = dayjs(now).format('YYYY-MM-DD HH:mm:ss');
    return serverTime;
  }

  public async healthcheck() {
    await db.$queryRaw`SELECT 1`;
  }
}

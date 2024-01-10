import { db } from '@nouvelles/database';
import dayjs from 'dayjs';
import { formatDate, startOfDate } from '@nouvelles/date';
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

  public getTimezoneServerTime() {
    try {
      const serverTime = new Date();
      const timezone = dayjs(serverTime).tz().toDate();
      return formatDate(timezone);
    } catch (error) {
      return 'Invalid date instance';
    }
  }

  public getStartOfDate(date: Date | number | string, unit: dayjs.UnitType) {
    const nextDate = dayjs(date).tz().toDate();
    const nextStartOfDate = startOfDate(nextDate, unit);
    return nextStartOfDate;
  }

  public getDate(date: Date | number | string) {
    const nextDate = dayjs(date).tz().toDate();
    return nextDate;
  }

  public async healthcheck() {
    await db.$queryRaw`SELECT 1`;
  }
}

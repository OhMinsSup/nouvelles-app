import { db } from '@nouvelles/database';
import dayjs from 'dayjs';
import { formatDate, startOfDate } from '@nouvelles/date';
import { injectable, singleton } from 'tsyringe';

interface Service {
  getServerTime: () => string;
  healthcheck: () => Promise<void>;
}

@singleton()
@injectable()
export class CommonService implements Service {
  public getServerTime() {
    try {
      return formatDate(new Date());
    } catch (error) {
      return 'Invalid date instance';
    }
  }

  public getTimezoneServerTime() {
    try {
      return formatDate(dayjs(new Date()).tz().toDate());
    } catch (error) {
      return 'Invalid date instance';
    }
  }

  public getStartOfDate(date: Date | number | string, unit: dayjs.UnitType) {
    return startOfDate(dayjs(date).tz().toDate(), unit);
  }

  public getDate(date: Date | number | string) {
    return dayjs(date).tz().toDate();
  }

  public async healthcheck() {
    await db.$queryRaw`SELECT 1`;
  }
}

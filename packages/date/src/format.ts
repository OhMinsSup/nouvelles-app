import dayjs from 'dayjs';
import { BaseError, ErrorType } from '@nouvelles/error';

export const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

export function formatDate(
  date: Date | number | string,
  formatStr = defaultFormat,
): string {
  if (typeof date === 'string') {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      throw new BaseError(ErrorType.DateError, `Invalid date string: ${date}`);
    }
    date = newDate;
  }

  if (typeof date === 'number') {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      throw new BaseError(ErrorType.DateError, `Invalid date number: ${date}`);
    }
    date = newDate;
  }

  if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      throw new BaseError(ErrorType.DateError, 'Invalid date instance');
    }
  }

  return dayjs(date).format(formatStr);
}

export function formatForNeusralDate(
  str: string | undefined,
  formatStr = defaultFormat,
) {
  const dateStr = dayjs(str, 'YY.MM.DD').format(formatStr);
  const time = dayjs(dateStr).toDate();
  if (isNaN(time.getTime())) {
    throw new BaseError(ErrorType.DateError, `Invalid date string: ${str}`);
  }
  return time;
}

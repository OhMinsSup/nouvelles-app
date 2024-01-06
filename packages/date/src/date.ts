import dayjs from 'dayjs';

export const startOfDate = (
  date: Date | number | string,
  unit: dayjs.UnitType,
) => {
  return dayjs(date).startOf(unit).toDate();
};

import addMinutes from 'date-fns/add_minutes';
import compareAsc from 'date-fns/compare_asc';
import endOfDay from 'date-fns/end_of_day';
import isBefore from 'date-fns/is_before';
import min from 'date-fns/min';
import range from 'lodash/range';
import { DateRange, MapCellInfoToDateRange } from '../types';
import { cellToDate } from './cellToDate';

export type RecurringTimeRange = DateRange[];

export const createMapCellInfoToRecurringTimeRange: MapCellInfoToDateRange = ({
  fromY: toMin,
  fromX: toDay,
  originDate,
}) => ({ startX, startY, endX, spanY, source, title }) => {
  const result = range(startX, endX + 1)
    .map(i => {
      const startDate = cellToDate({
        startX: i,
        startY,
        toMin,
        toDay,
        originDate,
      });
      let endDate = min(
        addMinutes(startDate, toMin(spanY)),
        endOfDay(startDate),
      );

      const range: DateRange = isBefore(startDate, endDate)
        ? [startDate, endDate, source, title]
        : [endDate, startDate, source, title];

      return range;
    })
    .sort((range1, range2) => compareAsc(range1[0], range2[0]));

  return result;
};

import isBefore from 'date-fns/is_before';
import { MapCellInfoToDateRange } from '../types';
import { cellToDate } from './cellToDate';

export const createMapCellInfoToContiguousDateRange: MapCellInfoToDateRange = ({
  fromY: toMin,
  fromX: toDay,
  originDate,
}) => ({ startX, startY, endX, endY, source, title }) => {
  const startDate = cellToDate({ startX, startY, toMin, toDay, originDate });
  const endDate = cellToDate({
    startX: endX,
    startY: endY,
    toMin,
    toDay,
    originDate,
  });
  source = '';
  title = '';

  return [
    isBefore(startDate, endDate)
      ? [startDate, endDate, source, title]
      : [endDate, startDate, source, title],
  ];
};

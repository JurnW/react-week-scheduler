import compareAsc from 'date-fns/compare_asc';
import _mergeRanges from 'merge-ranges';
import { ScheduleType } from '../types';

export function mergeRanges(event: ScheduleType): ScheduleType {
  return _mergeRanges(
    [...event].map(
      d => [new Date(d[0]), new Date(d[1]), d[2]] as [Date, Date, string],
    ),
  );
}

export function mergeEvents(
  event1: ScheduleType,
  event2: ScheduleType | null,
): ScheduleType {
  if (event2 === null) {
    return event1;
  }

  return mergeRanges([...event1, ...event2]).sort((range1, range2) =>
    compareAsc(range1[0], range2[0]),
  );
}

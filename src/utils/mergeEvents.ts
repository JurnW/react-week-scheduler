import _mergeRanges from 'merge-ranges';
import { ScheduleType } from '../types';

export function mergeRanges(event: ScheduleType): ScheduleType {
  return _mergeRanges(
    [...event].map(
      d =>
        [new Date(d[0]), new Date(d[1]), d[2], d[3]] as [
          Date,
          Date,
          string,
          string,
        ],
    ),
  );
}

import classcat from 'classcat';
import { isBefore, isEqual, isWithinRange } from 'date-fns';
import React from 'react';
import {
  CellInfo,
  ClassNames,
  DateRange,
  Grid,
  OnChangeCallback,
  ScheduleType,
} from '../types';
import { RangeBox } from './RangeBox';

export type ScheduleProps = {
  classes: ClassNames;
  grid: Grid;
  onChange?: OnChangeCallback;
  isResizable?: boolean;
  isDeletable?: boolean;
  moveAxis: 'none' | 'both' | 'x' | 'y';
  cellInfoToDateRange(cell: CellInfo): DateRange;
  onActiveChange?(index: [number, number] | [null, null]): void;
  onClick?(index: [number, number] | [null, null]): void;
  getIsActive(indexes: { cellIndex: number; rangeIndex: number }): boolean;
  eventContentComponent?: any;
  eventRootComponent?: any;
  disabled?: boolean;
};

export const Schedule = React.memo(function Schedule({
  classes,
  ranges,
  grid,
  className,
  onChange,
  isResizable,
  isDeletable,
  moveAxis,
  cellInfoToDateRange,
  dateRangeToCells,
  onActiveChange,
  eventContentComponent,
  eventRootComponent,
  onClick,
  getIsActive,
}: {
  dateRangeToCells(range: DateRange): CellInfo[];
  ranges: ScheduleType;
  className?: string;
  classes: ClassNames;
} & ScheduleProps) {
  // function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  //   if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  //   if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  //   if (b_start < a_start && a_end < b_end) return true; // a in b
  //   return false;
  // }
  // function multipleDateRangeOverlaps(a, b) {
  //   var i, j;
  //   for (i = 0; i < arguments.length - 2; i += 2) {
  //     for (j = i + 2; j < arguments.length; j += 2) {
  //       console.log(
  //         arguments[i],
  //         arguments[i + 1],
  //         arguments[j],
  //         arguments[j + 1],
  //       );
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  const bookedTimes: any = [];
  ranges.map((t, tIndex) => {
    ranges.map((range: any, rangeIndex: number) => {
      const collidesWithMeeting =
        isEqual(t[0], new Date(range[1])) || isEqual(t[1], new Date(range[0]));
      if (
        tIndex !== rangeIndex &&
        isWithinRange(t[0], new Date(range[0]), new Date(range[1])) &&
        !collidesWithMeeting
      ) {
        bookedTimes.push(tIndex, rangeIndex);
      }
    });
  });

  return (
    <div className={classes['range-boxes']}>
      {ranges.map((dateRange, rangeIndex) => {
        const isPast = isBefore(dateRange[1], new Date());
        return (
          <span key={rangeIndex}>
            {dateRangeToCells(dateRange).map((cell, cellIndex, cellArray) => {
              const isGoogleEvent = cell.source === 'google';
              const isDouble = bookedTimes.includes(rangeIndex);
              const isSecondDouble = bookedTimes.indexOf(rangeIndex) % 2 === 0;

              return (
                <RangeBox
                  classes={classes}
                  onActiveChange={onActiveChange}
                  key={`${rangeIndex}.${ranges.length}.${cellIndex}.${cellArray.length}`}
                  isResizable={isResizable}
                  moveAxis={moveAxis}
                  isDeletable={isDeletable}
                  cellInfoToDateRange={cellInfoToDateRange}
                  cellArray={cellArray}
                  cellIndex={cellIndex}
                  rangeIndex={rangeIndex}
                  className={classcat([
                    className,
                    {
                      [classes['is-past']]: isPast,
                      [classes['is-google']]: isGoogleEvent,
                      [classes['is-double']]: isDouble,
                    },
                  ])}
                  onChange={onChange}
                  onClick={onClick}
                  grid={grid}
                  cell={cell}
                  getIsActive={getIsActive}
                  eventContentComponent={eventContentComponent}
                  eventRootComponent={eventRootComponent}
                  disabled={isGoogleEvent}
                  isDouble={isDouble}
                  isSecondDouble={isSecondDouble}
                />
              );
            })}
          </span>
        );
      })}
    </div>
  );
});

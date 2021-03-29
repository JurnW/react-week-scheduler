import classcat from 'classcat';
import { isBefore } from 'date-fns';
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
  meetingDuration: number;
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
  meetingDuration,
}: {
  dateRangeToCells(range: DateRange): CellInfo[];
  ranges: ScheduleType;
  className?: string;
  classes: ClassNames;
} & ScheduleProps) {
  const overlappingMeetings: { [x: number]: string }[] = [];

  ranges.map((currentMeeting, currentMeetingIndex) => {
    ranges.map((otherMeeting, otherMeetingIndex) => {
      const sameIndex = currentMeetingIndex === otherMeetingIndex;
      const timeRangeOverlaps =
        currentMeeting[0] < otherMeeting[1] &&
        currentMeeting[1] > otherMeeting[0];
      if (!sameIndex && timeRangeOverlaps) {
        overlappingMeetings.push({
          [currentMeetingIndex]: otherMeetingIndex.toString(),
        });
      }
    });
  });

  const meetingConflicts = overlappingMeetings.reduce(
    (accum: { [x: string]: any }, obj: { [x: string]: any }) => {
      for (let key in obj) {
        accum[key] = accum[key] ? [...accum[key], obj[key]] : [obj[key]];
      }
      return accum;
    },
    [],
  );

  const countUnique = (iterable: Iterable<number>) => {
    return new Set(iterable).size;
  };

  const calculateMeetingPlacement = (rangeIndex: number) => {
    let numberOfConflicts = 1;
    let meetingPosition = 1;

    if (!meetingConflicts.hasOwnProperty(rangeIndex)) {
      return { numberOfConflicts, meetingPosition };
    }

    meetingConflicts[rangeIndex].map((currentMeeting: number) => {
      if (
        currentMeeting !== rangeIndex &&
        meetingConflicts[rangeIndex].length > 1
      ) {
        let totalConflicts: number[] = [];
        let positionArray: boolean[] = [];

        meetingConflicts[rangeIndex].map((range: number) => {
          positionArray.push(rangeIndex > range);
          meetingConflicts[rangeIndex].map((currentConflict: number) => {
            totalConflicts.push(...meetingConflicts[currentConflict]);
          });

          numberOfConflicts =
            countUnique(
              totalConflicts.filter(index => index !== currentMeeting),
            ) + 1;
        });
        meetingPosition = positionArray.filter(c => c === true).length + 1;
      } else {
        numberOfConflicts = 2;
        const numberOfExistingOverlaps = meetingConflicts[rangeIndex][0];

        if (meetingConflicts[numberOfExistingOverlaps].length > 2) {
          meetingPosition =
            meetingConflicts[numberOfExistingOverlaps].length + 1;
        } else {
          meetingPosition =
            rangeIndex < Number(...meetingConflicts[rangeIndex]) ? 1 : 2;
        }

        numberOfConflicts = Math.max(
          2,
          meetingConflicts[numberOfExistingOverlaps].length + 1,
        );
      }
    });

    return { numberOfConflicts, meetingPosition };
  };

  return (
    <div className={classes['range-boxes']}>
      {ranges.map((dateRange, rangeIndex) => {
        const isPast = isBefore(dateRange[1], new Date());
        return (
          <span key={rangeIndex}>
            {dateRangeToCells(dateRange).map((cell, cellIndex, cellArray) => {
              const isGoogleEvent = cell.source === 'google';
              const {
                numberOfConflicts,
                meetingPosition,
              } = calculateMeetingPlacement(rangeIndex);

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
                  ranges={ranges}
                  meetingDuration={meetingDuration}
                  className={classcat([
                    className,
                    {
                      [classes['is-past']]: isPast,
                      [classes['is-google']]: isGoogleEvent,
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
                  numberOfConflicts={numberOfConflicts}
                  meetingPosition={meetingPosition}
                />
              );
            })}
          </span>
        );
      })}
    </div>
  );
});

// @ts-ignore
import VisuallyHidden from '@reach/visually-hidden';
import classcat from 'classcat';
import React, { useContext } from 'react';
import { SchedulerContext } from '../context';
import { ClassNames, DateRange } from '../types';
import {
  getFormattedComponentsForDateRange,
  getTextForDateRange,
} from '../utils/getTextForDateRange';

export type EventContentProps = {
  width: number;
  height: number;
  classes: ClassNames;
  dateRange: DateRange;
  isStart: boolean;
  isEnd: boolean;
  title: string;
};

export const EventContent = React.memo(function EventContent({
  width,
  height,
  classes,
  dateRange,
  isStart,
  isEnd,
  title,
}: EventContentProps) {
  const { locale } = useContext(SchedulerContext);
  const [start, end] = getFormattedComponentsForDateRange({
    dateRange,
    locale,
    includeDayIfSame: false,
    title,
  });
  const isFifteenMinuteMeeting = height < 25 ? '0 10px' : '';

  return (
    <div
      style={{
        width: width - 4,
        height: height - 4,
        padding: isFifteenMinuteMeeting,
      }}
      className={classcat([
        classes['event-content'],
        {
          [classes['external-meeting']]: title,
        },
      ])}
    >
      <VisuallyHidden>
        {getTextForDateRange({ dateRange, locale, title })}
      </VisuallyHidden>
      <span aria-hidden className={classes.start}>
        {isStart && start}
      </span>
      <span aria-hidden className={classes.end}>
        {title ? title : isEnd && end}
      </span>
    </div>
  );
});

import Tippy from '@tippy.js/react';
import classcat from 'classcat';
import addMinutes from 'date-fns/add_minutes';
import compareAsc from 'date-fns/compare_asc';
import getDay from 'date-fns/get_day';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import ar from 'date-fns/locale/ar';
import de from 'date-fns/locale/de';
import en from 'date-fns/locale/en';
import ja from 'date-fns/locale/ja';
import setDay from 'date-fns/set_day';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import startOfWeek from 'date-fns/start_of_week';
import mapValues from 'lodash/mapValues';
import 'pepjs';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import CustomProperties from 'react-custom-properties';
import ReactDOM from 'react-dom';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import useUndo from 'use-undo';
import { DefaultEventRootComponent } from '../src/components/DefaultEventRootComponent';
import { TimeGridScheduler } from '../src/components/TimeGridScheduler';
import useCheckMobileScreen from '../src/hooks/useCheckMobile';
import { useMousetrap } from '../src/hooks/useMousetrap';
import { classes as defaultClasses } from '../src/styles';
import { EventRootProps, ScheduleType } from '../src/types';
// @ts-ignore
import DeleteIcon from './assets/outline-delete-24px.svg';
import demoClasses from './index.module.scss';

const locales = {
  ja,
  en,
  de,
  ar,
};

const classes = mapValues(
  defaultClasses,
  (value, key: keyof typeof defaultClasses) =>
    classcat([value, demoClasses[key]]),
);

const currentTime: [string, string, string, string] = [
  new Date().toString(),
  addMinutes(new Date(), 1).toString(),
  '',
  '',
];

const rangeStrings: { timerange: string[]; source: string; title: string }[] = [
  // {
  //   timerange: ['2020-11-09 01:30', '2020-11-09 02:30'],
  //   source: 'google',
  //   title: 'Meeting title',
  // },
  // {
  //   timerange: ['2020-11-09 02:00', '2020-11-09 02:30'],
  //   source: 'google',
  //   title: 'Meeting title',
  // },
  {
    timerange: ['2021-03-30 03:30', '2021-03-30 05:30'],
    source: 'local',
    title: '',
  },
  {
    timerange: ['2021-03-30 04:45', '2021-03-30 05:30'],
    source: 'local',
    title: '',
  },
  {
    timerange: ['2021-03-30 07:00', '2021-03-30 08:00'],
    source: 'local',
    title: '',
  },
  {
    timerange: ['2021-03-30 18:00', '2021-03-30 19:30'],
    source: 'local',
    title: '',
  },
  // {
  //   timerange: ['2020-11-14 03:30', '2020-11-14 04:30'],
  //   source: 'google',
  //   title: 'Meeting title that is quite a bit longer',
  // },
];

const defaultSchedule: [Date, Date, string, string][] = rangeStrings.map(
  range => {
    const start = new Date(range.timerange[0]);
    const end = new Date(range.timerange[1]);
    const source = range.source;
    const title = range.title;
    return [start, end, source, title] as [Date, Date, string, string];
  },
);

const EventRoot = React.forwardRef<any, EventRootProps>(function EventRoot(
  {
    handleDelete,
    disabled,
    isMobile,
    ranges,
    rangeIndex,
    onChange,
    meetingDuration,
    ...props
  },
  ref,
) {
  console.log(isMobile);
  return (
    <Tippy
      arrow
      interactive
      hideOnClick={false}
      // className={demoClasses.tooltip}
      className={classcat([demoClasses.tooltip, classes['hide-up-to-tablets']])}
      content={
        <button disabled={disabled} onClick={handleDelete}>
          <DeleteIcon className={demoClasses.icon} />
          Delete
        </button>
      }
    >
      <DefaultEventRootComponent
        handleDelete={handleDelete}
        disabled={disabled}
        ranges={ranges}
        rangeIndex={rangeIndex}
        meetingDuration={meetingDuration}
        onChange={onChange}
        {...props}
        ref={ref}
      />
    </Tippy>
  );
});

function App() {
  const [weekStart, setWeekStart] = useState(1);
  const originDate = useMemo(
    () =>
      startOfWeek(new Date(), {
        weekStartsOn: weekStart,
      }),
    [weekStart],
  );
  const defaultAdjustedSchedule = useMemo(
    () =>
      defaultSchedule
        .map(
          range =>
            [
              setMinutes(
                setHours(
                  setDay(originDate, getDay(range[0]), {
                    weekStartsOn: weekStart,
                  }),
                  getHours(range[0]),
                ),
                getMinutes(range[0]),
              ),
              setMinutes(
                setHours(
                  setDay(originDate, getDay(range[1]), {
                    weekStartsOn: weekStart,
                  }),
                  getHours(range[1]),
                ),
                getMinutes(range[1]),
              ),
              range[2],
              range[3],
            ] as [Date, Date, string, string],
        )
        .sort(([start], [end]) => compareAsc(start, end)),
    [weekStart, originDate],
  );
  const [
    scheduleState,
    {
      set: setSchedule,
      reset: resetSchedule,
      undo: undoSchedule,
      redo: redoSchedule,
      canUndo: canUndoSchedule,
      canRedo: canRedoSchedule,
    },
  ] = useUndo<ScheduleType>(defaultAdjustedSchedule);

  useMousetrap(
    'ctrl+z',
    () => {
      if (!canUndoSchedule) {
        return;
      }

      undoSchedule();
    },
    document,
  );

  useMousetrap(
    'ctrl+shift+z',
    () => {
      if (!canRedoSchedule) {
        return;
      }

      redoSchedule();
    },
    document,
  );

  const [verticalPrecision, setVerticalPrecision] = useState(15);
  const [
    visualGridVerticalPrecision,
    setVisualGridVerticalPrecision,
  ] = useState(30);
  const [cellClickPrecision, setCellClickPrecision] = useState(
    visualGridVerticalPrecision,
  );
  const [cellHeight, setCellHeight] = useState(45);
  const [cellWidth, setCellWidth] = useState(250);
  const [disabled, setDisabled] = useState(false);
  const [locale, setLocale] = useState('en');
  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    setSchedule(defaultAdjustedSchedule);
    resetSchedule(defaultAdjustedSchedule);
  }, [defaultAdjustedSchedule, setSchedule, resetSchedule]);

  return (
    <CustomProperties
      global={false}
      properties={{
        '--cell-height': `${cellHeight}px`,
        '--cell-width': `${cellWidth}px`,
      }}
    >
      <Fragment key={`${cellHeight},${cellWidth}`}>
        <TimeGridScheduler
          key={originDate.toString()}
          classes={classes}
          originDate={new Date()} // passed from Attendar App
          schedule={scheduleState.present}
          onChange={setSchedule}
          verticalPrecision={verticalPrecision}
          visualGridVerticalPrecision={visualGridVerticalPrecision}
          cellClickPrecision={cellClickPrecision}
          eventRootComponent={EventRoot}
          disabled={disabled}
          localization={locale}
          currentTime={currentTime}
          isMobile={isMobile}
          meetingDuration={30}
        />
      </Fragment>
    </CustomProperties>
  );
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);

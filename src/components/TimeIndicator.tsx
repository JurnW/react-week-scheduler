import classcat from 'classcat';
import React from 'react';
import { CellInfo, ClassNames, DateRange, Grid } from '../types';
import { IndicatorLine } from './IndicatorLine';

export type TimeIndicatorProps = {
  classes: ClassNames;
  grid: Grid;
  cellInfoToDateRange(cell: CellInfo): DateRange;
  eventRootComponent?: any;
};

export const TimeIndicator = React.memo(function TimeIndicator({
  classes,
  currentTime,
  grid,
  className,
  cellInfoToDateRange,
  dateRangeToCells,
  eventRootComponent,
}: {
  dateRangeToCells(range: DateRange): CellInfo[];
  currentTime: DateRange;
  className?: string;
  classes: ClassNames;
} & TimeIndicatorProps) {
  // const [cellInfo, setCellInfo] = useState(dateRangeToCells(currentTime));

  // useEffect(() => {
  //   setCellInfo(dateRangeToCells(currentTime));
  //   console.log(currentTime);
  // }, [currentTime]);

  return (
    <div>
      {dateRangeToCells(currentTime).map((cell, index) => {
        return (
          <IndicatorLine
            key={`indicator-${index}`}
            classes={classes}
            cellInfoToDateRange={cellInfoToDateRange}
            className={classcat([className])}
            grid={grid}
            cell={cell}
            eventRootComponent={eventRootComponent}
          />
        );
      })}
    </div>
  );
});

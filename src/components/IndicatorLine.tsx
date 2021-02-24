import classcat from 'classcat';
import React, { useMemo } from 'react';
import Draggable from 'react-draggable';
import { CellInfo } from '../types';
import { DefaultEventRootComponent } from './DefaultEventRootComponent';
import { TimeIndicatorProps } from './TimeIndicator';

export const IndicatorLine = React.memo(function IndicatorLine({
  classes,
  grid,
  cell,
  eventRootComponent: EventRootComponent = DefaultEventRootComponent,
}: TimeIndicatorProps & {
  className?: string;
  cell: CellInfo;
}) {
  const rect = useMemo(() => grid.getRectFromCell(cell), [cell, grid]);
  const { top, left, width, height } = rect;

  return (
    <Draggable
      bounds={{
        top: 0,
        bottom: grid.totalHeight - height,
        left: 0,
        right: grid.totalWidth,
      }}
      position={{ x: left, y: top }}
    >
      <EventRootComponent
        className={classcat([classes.indicator])}
        style={{
          width: width,
          height: 2,
        }}
      ></EventRootComponent>
    </Draggable>
  );
});

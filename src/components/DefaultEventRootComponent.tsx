import React from 'react';
import { EventRootProps } from '../types';

export const DefaultEventRootComponent = React.memo(
  React.forwardRef<any, EventRootProps>(function DefaultEventRootComponent(
    {
      isActive,
      handleDelete,
      cellIndex,
      classes,
      disabled,
      ranges,
      rangeIndex,
      meetingDuration,
      onChange,
      ...props
    },
    ref,
  ) {
    return <div ref={ref} aria-disabled={disabled} {...props} />;
  }),
);

DefaultEventRootComponent.displayName = 'DefaultEventRootComponent';

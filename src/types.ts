export type OnChangeCallback = (
  newDateRange: DateRange | undefined,
  rangeIndex: number,
) => void;

export type Coords = { x: number; y: number };

export type ClassNames = typeof import('./styles/styles.module.scss').default;

export type EventRootProps = {
  className?: string;
  classes: ClassNames;
  style?: React.CSSProperties;
  cellIndex: number;
  isActive: boolean;
  disabled?: boolean;
  handleDelete(): void;
  isMobile?: boolean;
  ranges: ScheduleType;
  rangeIndex: number;
  onChange: OnChangeCallback;
  meetingDuration: number;
};

export type ScheduleType = DateRange[];

export type CellInfo = {
  spanX: number;
  spanY: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  source: string;
  title: string;
};

export type DateRange = [Date, Date, string, string];

export type MapCellInfoToDateRange = (
  options: MapCellInfoToDateRangeOptions,
) => (cellInfo: CellInfo) => DateRange[];

export type MapCellInfoToDateRangeOptions = {
  fromY: (y: number) => number;
  fromX: (x: number) => number;
  originDate: Date;
};

export type Grid = {
  cellHeight: number;
  cellWidth: number;
  totalWidth: number;
  totalHeight: number;
  numVerticalCells: number;
  numHorizontalCells: number;
  getRectFromCell(cell: CellInfo): Rect;
  getCellFromRect(rect: Rect): CellInfo;
};

export type Rect = ClientRect & {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  source: string;
  title: string;
};

import format from 'date-fns/format';
import getMinutes from 'date-fns/get_minutes';
import isSameDay from 'date-fns/is_same_day';
import { DateRange } from '../types';

const formatTemplate = 'ddd h:mma';

const dropSame = (
  dates: [Date, Date],
  template: string,
  takeSecond: boolean = false,
  locale: typeof import('date-fns/locale/en'),
  title: string,
): [string, string] => {
  const [first, second] = dates.map(date => format(date, template, { locale }));
  if (first !== second || title) {
    return [first, second];
  }

  if (takeSecond) {
    return ['', second];
  }

  return [first, ''];
};

const formatHour = (
  date: Date,
  locale: typeof import('date-fns/locale/en'),
) => {
  if (getMinutes(date) === 0) {
    return format(date, 'h', { locale });
  }

  return format(date, 'h:mm', { locale });
};

type Options = {
  dateRange: DateRange;
  locale: typeof import('date-fns/locale/en');
  template?: string;
  template2?: string;
  includeDayIfSame?: boolean;
  title: string;
};

export const getFormattedComponentsForDateRange = ({
  dateRange,
  locale,
  template,
  template2,
  includeDayIfSame = true,
  title,
}: Options) => {
  const start = dateRange[0];
  const end = dateRange[1];

  if (isSameDay(start, end) && !template) {
    const [firstM, secondM] = dropSame([start, end], 'a', true, locale, title);
    const day = includeDayIfSame ? `${format(start, 'ddd', { locale })} ` : '';
    return [
      `${day}${formatHour(start, {
        locale,
      })}${firstM}`,
      `${formatHour(end, { locale })}${secondM}`,
    ];
  }

  const startDateStr = format(start, template || formatTemplate, { locale });
  const endDateStr = format(end, template2 || formatTemplate, { locale });

  return [startDateStr, endDateStr];
};

export const getTextForDateRange = (options: Options) => {
  return getFormattedComponentsForDateRange(options).join(' – ');
};

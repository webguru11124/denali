import { DateRange } from 'app/api/kpis/constants';
import { dayjs } from 'app/utils';

const dateRangeToString = (dateRange?: DateRange): string => {
  const now = dayjs().utc();
  let startingDate = now;

  switch (dateRange) {
    case DateRange.ThisWeek:
      startingDate = dayjs().utc().startOf('isoWeek');
      break;
    case DateRange.ThisMonth:
      startingDate = dayjs().utc().startOf('month');
      break;
    case DateRange.LastSevenDays:
      startingDate = dayjs().utc().add(-6, 'd');
      break;
    case DateRange.LastThirtyDays:
      startingDate = dayjs().utc().add(-29, 'd');
      break;
    default:
      return '';
  }

  const endDateFormat = now.month() === startingDate.month() ? 'D' : 'MMM D';

  return `${startingDate.format('MMM D')}-${now.format(endDateFormat)}`;
};

export default dateRangeToString;

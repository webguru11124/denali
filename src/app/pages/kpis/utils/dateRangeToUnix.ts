import { DateRange } from 'app/api/kpis/constants';
import { dayjs } from 'app/utils';

const dateRangeToUnix = (dateRange?: DateRange): number | undefined => {
  switch (dateRange) {
    case DateRange.ThisWeek:
      return dayjs().utc().startOf('isoWeek').unix();
    case DateRange.ThisMonth:
      return dayjs().utc().startOf('month').unix();
    case DateRange.LastSevenDays:
      return dayjs().utc().add(-6, 'd').startOf('day').unix();
    case DateRange.LastThirtyDays:
      return dayjs().utc().add(-29, 'd').startOf('day').unix();
    default:
      return undefined;
  }
};

export default dateRangeToUnix;

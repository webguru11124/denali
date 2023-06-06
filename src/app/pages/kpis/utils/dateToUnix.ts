import { dayjs } from 'app/utils';

const dateToUnix = (date?: Date | null): number | undefined => {
  if (date) {
    return dayjs(new Date(`${date.toLocaleString()} UTC`)).unix();
  }
  return undefined;
};

export default dateToUnix;

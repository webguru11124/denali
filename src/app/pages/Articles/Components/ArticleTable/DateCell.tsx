import dayjs from 'app/utils/dayjs';

const DateCell = ({ date }: { date?: string | null }) => {
  const formatDate = (): string => {
    if (!date) return '-';

    return dayjs(date).format('DD.MM.YYYY');
  };

  const formattedDate = formatDate();

  return <td className="text-sm text-grayscale-secondary">{formattedDate}</td>;
};

export default DateCell;

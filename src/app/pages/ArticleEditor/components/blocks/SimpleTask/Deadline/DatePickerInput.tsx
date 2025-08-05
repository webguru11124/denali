import { cx } from '@emotion/css';
import dayjs from 'dayjs';
import { Calendar } from 'iconsax-react';
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  date?: string;
}
const DatePickerInput = forwardRef<HTMLButtonElement, Props>(
  ({ date, onClick }, ref) => (
    <button ref={ref} className="flex items-center mr-2" onClick={onClick}>
      <Calendar size={16} className={cx({ 'mr-1': Boolean(date) })} />
      {date && (
        <span className="text-xs text-grayscale-secondary">
          {dayjs(date).format('DD.MM.YY')}
        </span>
      )}
    </button>
  )
);

export default DatePickerInput;

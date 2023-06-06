import { useArticlesTranslation } from 'app/internationalization/hooks';
import dayjs from 'dayjs';
import { ArrowLeft, ArrowRight, Trash } from 'iconsax-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DatePickerInput from './DatePickerInput';
import DatePickerTimeInput from './DatePickerTimeInput';

interface DeadlineProps {
  selected?: string;
  disabled?: boolean;
  onChange: (date: string | null) => void;
}

const Deadline = ({ selected, disabled, onChange }: DeadlineProps) => {
  const { t } = useArticlesTranslation();

  return (
    <ReactDatePicker
      disabled={disabled}
      selected={selected ? dayjs(selected).toDate() : dayjs().hour(18).toDate()}
      showPopperArrow={false}
      shouldCloseOnSelect={false}
      onChange={(date) => onChange(date?.toISOString() ?? null)}
      showTimeInput
      timeInputLabel=""
      customTimeInput={<DatePickerTimeInput date={selected} />}
      customInput={<DatePickerInput date={selected} />}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex justify-between bg-white px-5">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ArrowLeft size={14} />
          </button>
          <div className="flex">
            <span>{dayjs(date).format('MMMM')}</span>
            &nbsp;
            <span>{dayjs(date).format('YYYY')}</span>
          </div>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    >
      {selected && (
        <button
          className="flex items-center h-10 w-full hover:bg-hover-blue text-error text-sm font-lato rounded-sm"
          onClick={() => onChange(null)}
        >
          <Trash size={20} className="mx-2" />
          <span>{t('Remove deadline')}</span>
        </button>
      )}
    </ReactDatePicker>
  );
};

export default Deadline;

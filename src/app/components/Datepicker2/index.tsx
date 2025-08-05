import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import dayjs from 'dayjs';
import { ArrowLeft, ArrowRight, Trash } from 'iconsax-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DatePickerInput from './DatePickerInput';
import DatePickerTimeInput from './DatePickerTimeInput';

interface DatePickerProps {
  start?: string;
  end?: string;
  range?: boolean;
  inline: boolean;
  onChange: (date: string | [string | null, string | null] | null) => void;
  archiveToggle?: VoidFunction;
}

const Datepicker2 = ({
  start,
  end,
  range,
  inline,
  onChange,
  archiveToggle,
}: DatePickerProps) => {
  const { t } = useArticlesTranslation();

  const publishDate = start ? dayjs(start).toDate() : null;
  const archiveDate = end ? dayjs(end).toDate() : null;

  const onDateChange = (newDate: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(newDate)) {
      onChange([
        newDate[0]?.toISOString() ?? null,
        newDate[1]?.toISOString() ?? null,
      ]);

      return;
    }

    onChange(newDate?.toISOString() ?? null);
  };

  return (
    <ReactDatePicker
      selected={publishDate}
      startDate={range ? publishDate : undefined}
      endDate={range ? archiveDate : undefined}
      showPopperArrow={false}
      shouldCloseOnSelect={false}
      onChange={(newDate) => onDateChange(newDate)}
      showTimeInput
      timeInputLabel=""
      customTimeInput={
        <DatePickerTimeInput
          date={
            publishDate?.toDateString() ??
            dayjs().hour(18).toDate().toDateString()
          }
          archiveToggle={archiveToggle}
          isRange={range}
        />
      }
      customInput={
        !inline ? (
          <DatePickerInput
            date={
              publishDate?.toDateString() ??
              dayjs().hour(18).toDate().toDateString()
            }
          />
        ) : undefined
      }
      inline={inline}
      monthsShown={archiveToggle ? 2 : 1}
      selectsRange={range}
      renderCustomHeader={({
        customHeaderCount,
        monthDate,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex justify-between bg-white px-5">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className={cx({ invisible: customHeaderCount === 1 })}
          >
            <ArrowLeft size={14} />
          </button>
          <div className="flex">
            <span>{dayjs(monthDate).format('MMMM')}</span>
            &nbsp;
            <span>{dayjs(monthDate).format('YYYY')}</span>
          </div>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className={cx({ invisible: customHeaderCount === 0 })}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    >
      <button
        className={cx(
          'flex items-center h-10 w-full hover:bg-hover-blue text-error text-sm font-lato rounded-sm',
          { invisible: !start }
        )}
        onClick={() => {
          if (range) {
            onChange([null, null]);
            return;
          }
          onChange(null);
        }}
      >
        <Trash size={20} className="mx-2" />
        <span>{t('Remove schedule')}</span>
      </button>
    </ReactDatePicker>
  );
};

export default Datepicker2;

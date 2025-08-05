import { DateRange as DateRangeEnum } from 'app/api/kpis/constants';
import { DateRange, CalendarDate, CalendarDateRange } from 'app/api/kpis/types';
import { ButtonTag, DatePicker } from 'app/components';
import { useDispatch, useSelector } from 'app/hooks';
import { dateToUnix, unixToDate } from 'app/pages/kpis/utils';
import { selectors, actions } from 'app/store/kpis';
import { dayjs } from 'app/utils';
import { FC, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

interface DateRangeSelectProps {
  selectedDate?: DateRange;
  onDateSelected: (range: DateRange) => void;
  dates: Array<DateRange>;
}

const DateRangeSelect: FC<DateRangeSelectProps> = ({
  selectedDate,
  onDateSelected,
  dates,
}) => {
  const startDateUnix = useSelector(selectors.getSelectedStartDate) ?? null;
  const endDateUnix = useSelector(selectors.getSelectedEndDate) ?? null;
  const startDate = unixToDate(startDateUnix);
  const endDate = unixToDate(endDateUnix);
  const [isCalendarShow, toogleCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(selectedDate);
  const dispatch = useDispatch();
  const maxDate = new Date();

  const handleSelectRange = (item: DateRange) => {
    if (item.slug === DateRangeEnum.Custom) {
      toogleCalendar(!isCalendarShow);
      setSelectedDateRange(item);
    } else {
      onDateSelected(item);
    }
  };

  const handleApply = (range: CalendarDate) => {
    dispatch(
      actions.dateCustomRangeSelected({
        selectedDateRange,
        startDate: dateToUnix((range as CalendarDateRange)[0]),
        endDate: dateToUnix((range as CalendarDateRange)[1]),
      })
    );
    toogleCalendar(false);
  };

  const handleCancel = () => {
    toogleCalendar(false);
  };

  const from = dayjs(startDate).format('MMM Do YYYY');
  const to = dayjs(endDate).format('MMM Do YYYY');
  const text = `${from} - ${to}`;

  useEffect(() => {
    setSelectedDateRange(selectedDate);
  }, [selectedDate]);

  return (
    <div className="mb-2 flex">
      {dates.map(({ id, name, slug, ...restProps }) => (
        <div className="relative" key={id}>
          <ButtonTag
            isActive={selectedDateRange?.id === id}
            onClick={() => handleSelectRange({ ...restProps, id, slug, name })}
          >
            {slug === DateRangeEnum.Custom &&
            startDate &&
            endDate &&
            selectedDateRange?.slug === DateRangeEnum.Custom
              ? text
              : name}
          </ButtonTag>
          {slug === DateRangeEnum.Custom && isCalendarShow && (
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onApply={handleApply}
              onCancel={handleCancel}
              maxDate={maxDate}
            ></DatePicker>
          )}
        </div>
      ))}
    </div>
  );
};

export default DateRangeSelect;

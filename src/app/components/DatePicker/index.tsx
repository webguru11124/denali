import styled from '@emotion/styled';
import { CalendarDate, CalendarDateRange } from 'app/api/kpis/types';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

interface DatePickerProps {
  onCancel: () => void;
  onApply: (range: CalendarDate) => void;
  startDate: Date | null;
  endDate: Date | null;
  maxDate?: Date;
}

const CalendarContainer = styled.div`
  top: 50px;
  z-index: 1000;
`;

const DatePicker: React.FC<DatePickerProps> = ({
  onCancel,
  onApply,
  startDate,
  endDate,
  maxDate,
}) => {
  const [range, setRange] = useState<CalendarDate>([startDate, endDate]);
  const [isApplyAvailable, setApplyAvailable] = useState(false);

  const handleApply = () => {
    onApply(range);
  };

  const handleCancel = () => {
    setRange([startDate, endDate]);
    onCancel();
  };

  useEffect(() => {
    if (
      range &&
      (range as CalendarDateRange)[0] &&
      (range as CalendarDateRange)[1]
    ) {
      setApplyAvailable(true);
    } else {
      setApplyAvailable(false);
    }
  }, [range]);

  return (
    <CalendarContainer className="absolute inset rounded border p-2 bg-white">
      <Calendar
        selectRange
        onChange={setRange}
        value={range}
        maxDate={maxDate}
      />
      <div className="flex justify-between pt-2">
        <button
          className="w-2/5 py-3 text-black hover:bg-focus-background border rounded border-gray-light"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="w-2/5 py-3 text-white bg-primary rounded border disabled:opacity-50"
          onClick={handleApply}
          disabled={!isApplyAvailable}
        >
          Apply
        </button>
      </div>
    </CalendarContainer>
  );
};

export default DatePicker;

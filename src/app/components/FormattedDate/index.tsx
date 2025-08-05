import { dayjs } from 'app/utils';
import React from 'react';

interface FormattedDateProps {
  date: string | Date;
  className?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, className }) => (
  <div className={className}>{dayjs(date).format('MM/DD/YYYY')}</div>
);

export default FormattedDate;

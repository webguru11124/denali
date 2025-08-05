import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

interface ColumnProps {
  className?: string;
  amount: number;
  total: number;
}

const LABELS = ['1st', '2nd', '3rd', '4th'];

const HEIGHT = 200;

const ColumnWrapper = styled.div`
  width: 37px;
`;

const ColumnsContainer = styled.div`
  height: ${HEIGHT}px;
`;

const Column: React.FC<ColumnProps> = ({ className, amount, total }) => {
  const height = (HEIGHT / total) * amount;
  return (
    <ColumnWrapper className={className}>
      <button
        className={cx(
          'w-full rounded-t-lg bg-focus shadow-card',
          css`
            height: ${height}px;
          `
        )}
        type="button"
      >
        <span />
      </button>
    </ColumnWrapper>
  );
};

interface LabelProps {
  label: string;
  className?: string;
}

interface BarChartProps {
  columns: Array<number>;
}

const Label: React.FC<LabelProps> = ({ label, className }) => (
  <ColumnWrapper className={className}>
    <div className={cx('w-full text-center text-sm')}>{label}</div>
  </ColumnWrapper>
);

const BarChart: React.FC<BarChartProps> = ({ columns }) => {
  const total = columns.reduce((acc, col) => acc + col, 0);
  return (
    <div>
      <div className="flex">
        {columns.map((col, index) => (
          <Label
            key={String(index)}
            label={`${Math.round((col / total) * 100) || 0}%`}
            className={cx(index !== 0 && 'ml-12')}
          />
        ))}
      </div>
      <ColumnsContainer className="flex items-end">
        {columns.map((col, index) => (
          <Column
            amount={col}
            total={total}
            key={String(index)}
            className={cx(index !== 0 && 'ml-12')}
          />
        ))}
      </ColumnsContainer>
      <div className="flex mt-3">
        {columns.map((_, index) => (
          <Label
            key={String(index)}
            label={LABELS[index] || `${index + 1}th`}
            className={cx(index !== 0 && 'ml-12')}
          />
        ))}
      </div>
    </div>
  );
};

export default BarChart;

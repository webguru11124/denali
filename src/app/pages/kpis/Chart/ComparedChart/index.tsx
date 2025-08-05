import { css, cx } from '@emotion/css';
import { KpiValueFormat } from 'app/api/kpis/types';
import { getPercentage } from 'app/utils';
import { ReactNode } from 'react';

import { formatKPIValue } from '../../utils';

interface ComparedChartProps {
  primaryName?: string;
  secondaryName?: string;
  total: number;
  target: number;
  kpiValueFormat?: KpiValueFormat;
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-xl">{children}</p>
);

const getPercentWidth = (comparedValue: number, value: number) =>
  comparedValue > value ? 100 : getPercentage(comparedValue, value);

const Item = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cx(
        'text-white flex whitespace-nowrap items-center h-6 text-sm pl-2 rounded-r',
        className
      )}
    >
      <div className="w-full mx-0.5">
        <span className="line-clamp-1">{children}</span>
      </div>
    </div>
  );
};

const ComparedChart = ({
  primaryName,
  secondaryName,
  total,
  target,
  kpiValueFormat,
}: ComparedChartProps) => {
  const totalWidth = getPercentWidth(total, target);
  const targetWidth = getPercentWidth(target, total);

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Label>{formatKPIValue(total, kpiValueFormat)}</Label>
          <Item
            className={cx(
              'bg-focus',
              css`
                width: ${totalWidth}%;
              `
            )}
          >
            {primaryName}
          </Item>
        </div>
        <div className="mt-3">
          <Label>{formatKPIValue(target, kpiValueFormat)}</Label>
          <Item
            className={cx(
              'bg-orange',
              css`
                width: ${targetWidth}%;
              `
            )}
          >
            {secondaryName}
          </Item>
        </div>
      </div>
    </div>
  );
};

export default ComparedChart;

import { cx, css } from '@emotion/css';
import { getPercentage } from 'app/utils';
import React from 'react';

import SplitBar from './SplitBar';

interface ProgressBarProps {
  className?: string;
  completion: number; // completed steps amount
  stepsAmount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  completion,
  stepsAmount,
}) => {
  if (stepsAmount <= 20)
    return (
      <div className={className}>
        <SplitBar stepsAmount={stepsAmount} completion={completion} />
      </div>
    );

  return (
    <div
      className={cx(
        'h-5 w-full flex overflow-hidden rounded-lg bg-gray-light',
        className
      )}
    >
      <div
        className={cx(
          'bg-success',
          css`
            width: ${getPercentage(completion, stepsAmount)}%;
          `
        )}
      />
    </div>
  );
};

export default ProgressBar;

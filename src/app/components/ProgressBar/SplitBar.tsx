import { cx } from '@emotion/css';
import { FC } from 'react';

interface SplitBarProps {
  stepsAmount: number;
  completion: number; // in percent
}

const SplitBar: FC<SplitBarProps> = ({ stepsAmount, completion }) => (
  <div className="flex">
    {[...new Array(stepsAmount)].map((_, index) => (
      <div
        key={index.toString()}
        className={cx(
          'h-5 w-full overflow-hidden first:rounded-l-lg last:rounded-r-lg ml-1 first:ml-0',
          completion >= index + 1 ? 'bg-success' : 'bg-gray-light'
        )}
      />
    ))}
  </div>
);

export default SplitBar;

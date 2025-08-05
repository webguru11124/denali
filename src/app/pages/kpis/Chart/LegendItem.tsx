import { cx } from '@emotion/css';
import { FC } from 'react';

interface LegendItemProps {
  indicatorClassName?: string;
  name: string;
  className: string;
}

const LegendItem: FC<LegendItemProps> = ({
  indicatorClassName,
  name,
  className,
}) => (
  <div className={cx('flex items-center', className)}>
    <div className={cx('w-4 h-4', indicatorClassName)} />
    <p className="text-grayscale-secondary ml-2">{name}</p>
  </div>
);

export default LegendItem;

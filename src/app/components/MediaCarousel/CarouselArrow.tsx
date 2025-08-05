import { cx } from '@emotion/css';
import React from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

interface CarouselArrowProps {
  Icon: RemixiconReactIconComponentType;
  onClick: () => void;
  className: string;
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({
  onClick,
  className,
  Icon,
}) => (
  <button
    type="button"
    className={cx(
      'absolute h-full flex px-6 items-center top-1/2  transform -translate-y-1/2',
      className
    )}
    onClick={onClick}
  >
    <Icon className="text-white w-6 h-6" />
  </button>
);

export default CarouselArrow;

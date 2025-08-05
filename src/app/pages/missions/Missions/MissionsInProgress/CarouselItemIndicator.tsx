import { cx } from '@emotion/css';
import React from 'react';

interface CarouselItemIndicatorProps {
  isActive: boolean;
}

const CarouselItemIndicator: React.FC<CarouselItemIndicatorProps> = ({
  isActive,
}) => (
  <li
    className={cx(
      'bg-white w-2 rounded-full transition-all duration-300 mr-2 h-2 inline-block',
      {
        'opacity-50': !isActive,
        'w-3': isActive,
      }
    )}
  />
);

export default CarouselItemIndicator;

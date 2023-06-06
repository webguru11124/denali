import { cx } from '@emotion/css';
import { OrderType } from 'app/api/types';
import { ArrowUp, ArrowDown, ArrowSwapVertical } from 'iconsax-react';
import { ReactNode, useState } from 'react';

import IconButton from '../IconButton';
interface SortIconButtonProps {
  isActive: boolean;
  sort?: OrderType;
  onChange: (val: OrderType) => void;
}

const SortIconButton = ({
  isActive = false,
  sort = 'asc',
  onChange,
}: SortIconButtonProps) => {
  const handleChange = () => {
    if (sort === 'asc') {
      onChange('desc');
    } else {
      onChange('asc');
    }
  };
  return (
    <>
      <button onClick={handleChange} type="button">
        {isActive && (
          <span className="flex items-center text-grayscale-secondary">
            {sort == 'asc' && <ArrowUp className="w-[15px] h-[15px]" />}
            {sort === 'desc' && <ArrowDown className="w-[15px] h-[15px]" />}
          </span>
        )}

        {!isActive && (
          <span className="flex items-center text-gray-dark">
            <ArrowSwapVertical className="w-[15px] h-[15px]" />
          </span>
        )}
      </button>
    </>
  );
};

export default SortIconButton;

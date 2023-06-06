import { cx } from '@emotion/css';
import { Tag } from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { SimpleTaskBlockCategoryEnum2 } from '..';

import CategoryItem from './CategoryItem';

interface CategoryDropDownProps {
  selected?: SimpleTaskBlockCategoryEnum2;
  disabled?: boolean;
  onClick: (category?: SimpleTaskBlockCategoryEnum2) => void;
}

const CategoryDropDown = ({
  selected,
  disabled,
  onClick,
}: CategoryDropDownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="relative">
        <Tag
          size={16}
          className={cx({ 'text-grayscale-secondary': open })}
          onClick={() => {
            if (disabled) return;

            setOpen((prev) => !prev);
          }}
        />
        {open && (
          <div className="absolute min-w-[170px] bg-white rounded-lg z-50 shadow-lg m-0 bg-clip-padding left-2 top-8 transform -translate-y-2 shadow-atobi p3">
            {Object.values(SimpleTaskBlockCategoryEnum2).map((val, index) => {
              return (
                <CategoryItem
                  key={val}
                  index={index}
                  value={val}
                  onClick={onClick}
                  selected={val === selected}
                />
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
export default CategoryDropDown;

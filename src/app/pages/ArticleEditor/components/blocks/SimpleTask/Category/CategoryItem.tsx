import { cx } from '@emotion/css';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';

import { SimpleTaskBlockCategoryEnum2 } from '..';

interface CategoryItemProps {
  value: SimpleTaskBlockCategoryEnum2;
  index: number;
  selected?: boolean;
  onClick: (category?: SimpleTaskBlockCategoryEnum2) => void;
}

const CategoryItem = ({
  value,
  index,
  selected = false,
  onClick,
}: CategoryItemProps) => {
  return (
    <button
      className={cx(
        'text-sm w-full h-[36px] px-3 font-normal flex items-center justify-between whitespace-nowrap bg-transparent hover:bg-hover-blue text-black',
        { 'rounded-t-lg': index === 0 },
        {
          'rounded-b-lg':
            index === Object.keys(SimpleTaskBlockCategoryEnum2).length - 1,
        }
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick(
          value === SimpleTaskBlockCategoryEnum2['NoCategory']
            ? undefined
            : value
        );
      }}
    >
      <span>{value}</span>
      {selected && <CheckLineIcon size={20} className="text-focus" />}
    </button>
  );
};
export default CategoryItem;

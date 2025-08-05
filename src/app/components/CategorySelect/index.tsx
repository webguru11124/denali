import { cx } from '@emotion/css';
import React from 'react';

interface Category {
  value: string;
  label: string;
}

interface CategorySelectProps {
  categories: Array<Category>;
  selectedCategory: string;
  onChange: (val: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategory,
  onChange,
}) => (
  <div className="w-full flex">
    {categories.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        value={value}
        className={cx(
          'flex-grow text-left pb-3',
          selectedCategory === value
            ? 'border-b-3 text-grayscale-primary border-focus'
            : 'border-b border-gray-dark text-grayscale-secondary'
        )}
        onClick={() => {
          onChange(value);
        }}
      >
        {label}
      </button>
    ))}
  </div>
);

export default CategorySelect;

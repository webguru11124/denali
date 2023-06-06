import { ChangeEventHandler } from 'react';

interface FilterDropdownProps {
  items?: Array<ItemProps>;
}

interface ItemProps {
  text: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FilterDropdown = ({ items }: FilterDropdownProps) => {
  const Item = ({ text, checked, onChange }: ItemProps) => {
    return (
      <div className="flex items-center mt-5">
        <input
          onChange={onChange}
          type="radio"
          className="filter-radio w-4 h-4 accent-focus"
          id={text}
          value={text}
          name="createdBy"
          checked={checked}
        />
        <label
          htmlFor={text}
          className="ml-2 text-sm font-medium text-gray-900"
        >
          {text}
        </label>
      </div>
    );
  };

  return (
    <div className="dropdown-menu min-w-max absolute bg-white z-50 pb-3 px-4 rounded-lg shadow-lg m-0 bg-clip-padding transform -translate-x-1/2 translate-y-8 flex flex-col shadow-atobi">
      <div className="pt-3 flex justify-start">
        <span className="text-sm text-grayscale-secondary font-normal">
          Filter by:
        </span>
      </div>

      {items &&
        items.map((item, index) => {
          return (
            <Item
              text={item.text}
              onChange={item.onChange}
              key={index}
              checked={item.checked}
            />
          );
        })}
    </div>
  );
};

export default FilterDropdown;

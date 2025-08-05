import { cx } from '@emotion/css';
import { HTMLAttributes } from 'react';

import DropdownItem, { DropdownItemProps } from './DropdownItem';

interface ActionsDropdownProps extends HTMLAttributes<HTMLDivElement> {
  items?: Array<DropdownItemProps>;
}

const ActionsDropdown = ({ items, className }: ActionsDropdownProps) => {
  return (
    <div
      className={cx(
        className,
        'min-w-max absolute bg-white rounded-lg z-50 shadow-lg m-0 bg-clip-padding right-0 transform -translate-y-2 shadow-atobi p3'
      )}
    >
      {items &&
        items.map((item, index) => {
          const { text, Icon, disabled, tag, onClick } = item;
          return (
            <DropdownItem
              isFirst={index === 0}
              isLast={index === items.length - 1}
              text={text}
              Icon={Icon}
              onClick={onClick}
              key={index}
              disabled={disabled}
              tag={tag}
            />
          );
        })}
    </div>
  );
};

export default ActionsDropdown;

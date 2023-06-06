import { cx } from '@emotion/css';
import { useCommonTranslation } from 'app/internationalization/hooks';
import { Icon as IconType } from 'iconsax-react';

export interface DropdownItemProps {
  text?: string;
  Icon?: IconType;
  disabled?: boolean;
  tag?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onClick?: VoidFunction;
}

const DropdownItem = ({
  text,
  Icon,
  disabled = false,
  tag,
  isFirst,
  isLast,
  onClick,
}: DropdownItemProps) => {
  const { t } = useCommonTranslation();
  return (
    <button
      className={cx(
        'text-sm w-full h-12  font-normal flex items-center whitespace-nowrap bg-transparent text-gray-700',
        { 'text-gray-dark': disabled },
        { 'hover:bg-hover-blue': !disabled },
        { 'rounded-t-lg': !disabled && isFirst },
        { 'rounded-b-lg': !disabled && isLast }
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      disabled={disabled}
    >
      {Icon && <Icon className="mx-4 w-6 h-6" />}
      <span>{text}</span>
      {tag && (
        <div className="flex bg-hover-blue px-1 py-1 ml-2 mr-4 rounded-sm">
          <span className="text-xs text-focus">{t('Coming Soon')}</span>
        </div>
      )}
    </button>
  );
};

export default DropdownItem;

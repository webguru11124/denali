import { cx } from '@emotion/css';
import { FC, ReactNode } from 'react';
import ArrowGoBackLineIcon from 'remixicon-react/ArrowGoBackLineIcon';
import LikeFilledIcon from 'remixicon-react/Heart3FillIcon';
import LikeIconLib from 'remixicon-react/Heart3LineIcon';
import TranslateIcon from 'remixicon-react/TranslateIcon';

type Variant = 'translate' | 'like';
interface TypedIconButtonProps {
  onClick: () => void;
  className?: string;
  variant: Variant;
  isActive?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
}
type IconList = {
  [key in Variant]: [FC, FC];
};
const ICONS: IconList = {
  translate: [() => <TranslateIcon />, () => <ArrowGoBackLineIcon />],
  like: [
    () => <LikeIconLib className="text-grayscale-secondary" />,
    () => <LikeFilledIcon className="text-error" />,
  ],
};

const TypedIconButton = ({
  onClick,
  className,
  children,
  variant,
  isActive,
  isLoading,
}: TypedIconButtonProps) => {
  const Icon = ICONS[variant][isActive ? 1 : 0];

  return (
    <button
      onClick={onClick}
      className={cx('p-2 rounded-lg bg-light shadow-card', className)}
      type="button"
      disabled={isLoading}
    >
      <span className="flex items-center text-grayscale-secondary">
        <Icon />
        {children}
      </span>
    </button>
  );
};

export default TypedIconButton;

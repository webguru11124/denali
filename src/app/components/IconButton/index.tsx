import { cx } from '@emotion/css';
import { ReactNode } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

interface IconButtonProps {
  Icon: RemixiconReactIconComponentType;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const IconButton = ({
  Icon,
  onClick,
  className,
  children,
  isLoading,
}: IconButtonProps) => (
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

export default IconButton;

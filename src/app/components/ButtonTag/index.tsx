import { cx } from '@emotion/css';
import { ReactNode } from 'react';

interface ButtonTagProps {
  onClick: () => void;
  isActive: boolean;
  children: ReactNode;
}

const ButtonTag = ({ onClick, isActive, children }: ButtonTagProps) => (
  <button
    onClick={onClick}
    className={cx(
      'px-4 py-3 text-focus text-sm border border-transparent hover:bg-focus-background mr-3 mb-4 rounded-2xl',
      isActive
        ? 'bg-focus-background border border-focus'
        : 'bg-grayscale-bg-dark'
    )}
    type="button"
  >
    {children}
  </button>
);

export default ButtonTag;

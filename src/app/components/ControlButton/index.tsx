import { cx } from '@emotion/css';
import React, { ButtonHTMLAttributes } from 'react';

const ControlButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    {...props}
    className={cx(
      'flex hover:bg-hover-blue w-full active:bg-focus-background items-center text-grayscale-primary py-3 px-4',
      className
    )}
    type="button"
  >
    {children}
  </button>
);

export default ControlButton;

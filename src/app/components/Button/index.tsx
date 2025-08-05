import { cx } from '@emotion/css';
import React, { ButtonHTMLAttributes } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

const variantClassNames = {
  primary:
    'bg-primary text-white disabled:bg-gray-light disabled:text-grayscale-secondary disabled:border-transparent',
  secondary:
    'border border-gray-light text-grayscale-primary hover:bg-grayscale-bg-dark',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: keyof typeof variantClassNames;
  icon?: RemixiconReactIconComponentType;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  loading,
  type,
  children,
  variant,
  className,
  icon: Icon,
  ...restProps
}) => (
  <button
    disabled={loading}
    className={cx(
      'rounded-lg border flex items-center justify-center border-blue-900 w-full hover:bg-blue-100 text-sm',
      loading && 'opacity-75',
      // Buttons with icon have smaller y padding
      Icon ? 'py-2' : 'py-3',
      variant && variantClassNames[variant],
      className
    )}
    onClick={onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...restProps}
  >
    {children}
    {Icon && (
      <div className="w-8 h-8 relative flex justify-center items-center ml-4">
        <div className="absolute top-0 left-0 w-8 h-8 rounded bg-white z-10 opacity-20" />
        <Icon className="w-6 h-6" />
      </div>
    )}
  </button>
);

Button.defaultProps = {
  type: 'button',
};

export default Button;

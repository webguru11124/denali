import { cx } from '@emotion/css';
import { FC } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: VoidFunction;
  icon: RemixiconReactIconComponentType;
}

const Button: FC<ButtonProps> = ({ label, icon: Icon, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      'flex items-center text-xs text-grayscale-secondary',
      className
    )}
  >
    <Icon className="w-4 h-4 mr-2" /> {label}
  </button>
);

export default Button;

import { cx } from '@emotion/css';
import { ReactNode } from 'react';
import ErrorIcon from 'remixicon-react/ErrorWarningLineIcon';

const variantClassNames = {
  error: 'flex items-center text-error text-sm',
};

interface AlertProps {
  variant: keyof typeof variantClassNames;
  className?: string;
  children: ReactNode;
}

const Alert = ({ children, variant, className }: AlertProps) => (
  <div className={cx(variantClassNames[variant], className)}>
    <div className="mr-1">{variant === 'error' && <ErrorIcon />}</div>
    <div>{children}</div>
  </div>
);

export default Alert;

import { cx } from '@emotion/css';
import React, { ReactNode } from 'react';

interface SettingsPopupProps {
  className?: string;
  children: ReactNode;
}

const SettingsPopup = ({ children, className }: SettingsPopupProps) => (
  <div className="relative">
    <div
      className={cx(
        'absolute bg-light shadow-atobi rounded-lg whitespace-nowrap',
        className
      )}
    >
      {React.Children.map(children, (child) => (
        <div className="hover:bg-hover-blue">{child}</div>
      ))}
    </div>
  </div>
);

export default SettingsPopup;

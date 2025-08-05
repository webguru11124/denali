import { ClassNames } from '@emotion/react';
import React, { FC } from 'react';

interface IToolbarIcon {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const ToolbarIcon: FC<IToolbarIcon> = ({ active, children, onClick }) => {
  return (
    <ClassNames>
      {({ cx }) => (
        <button
          className={cx(
            'w-8 h-8 flex justify-center items-center rounded-sm hover:bg-gray-light',
            {
              'bg-gray-dark opacity-100': active,
              'transparent opacity-60 hover:opacity-100': !active,
            }
          )}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </ClassNames>
  );
};

export default ToolbarIcon;

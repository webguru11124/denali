import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import config from 'app/config';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid ${config.colors.black};
  position: absolute;
  top: -10px;
  left: calc(50% - 10px);
  z-index: 2;
`;

const ArrowPopup: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div
      className={cx('bg-black text-white rounded relative p-2', className)}
      {...rest}
    >
      <Arrow />
      {children}
    </div>
  );
};

export default ArrowPopup;

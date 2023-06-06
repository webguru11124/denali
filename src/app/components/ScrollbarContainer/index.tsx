import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import config from 'app/config';
import { ReactNode } from 'react';

const ScrollbarContainer = ({
  children,
  className = '',
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <ContainerWithStyledScrollBar
      className={cx('overflow-y-scroll', className)}
    >
      {children}
    </ContainerWithStyledScrollBar>
  );
};

export const ContainerWithStyledScrollBar = styled.div`
  & {
    scrollbar-width: thin;
    scrollbar-color: ${config.colors['hover-blue']} transparent;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${config.colors['hover-blue']};
    border-radius: 20px;
    border: 1px solid transparent;
  }
`;

export default ScrollbarContainer;

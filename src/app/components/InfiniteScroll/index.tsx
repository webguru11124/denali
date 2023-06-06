import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';
import InfiniteScrollLib, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component';

const INFINITE_SCROLL_CLASSNAME = 'infinite-scroll-component__outerdiv';

const ScrollContainer = styled.div`
  .${INFINITE_SCROLL_CLASSNAME} {
    overflow: visible !important;
  }
`;

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  className,
  ...restProps
}) => (
  <ScrollContainer>
    <InfiniteScrollLib
      {...restProps}
      className={cx(INFINITE_SCROLL_CLASSNAME, className)}
    />
  </ScrollContainer>
);

export default InfiniteScroll;

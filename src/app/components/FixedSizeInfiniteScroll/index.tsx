import styled from '@emotion/styled';
import { InfiniteScroll } from 'app/components';
import { ReactNode } from 'react';

interface FixedSizeInfiniteScrollProps {
  hasMore: boolean;
  dataLength: number;
  loadMore: VoidFunction;
  height: string;
  children: ReactNode;
}

const ListContainer = styled.div`
  .infinite-scroll-component__outerdiv {
    .infinite-scroll-component {
      overflow-y: scroll !important;
    }
  }
`;

const FixedSizeInfiniteScroll = ({
  children,
  hasMore,
  dataLength,
  loadMore,
  height,
}: FixedSizeInfiniteScrollProps) => (
  <ListContainer>
    <InfiniteScroll
      scrollThreshold="30px"
      dataLength={dataLength}
      height={height}
      hasMore={hasMore}
      next={loadMore}
      loader="..."
    >
      {children}
    </InfiniteScroll>
  </ListContainer>
);

export default FixedSizeInfiniteScroll;

import { Frame, useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { logger } from '@sentry/utils';
import useGetChannelsQuery from 'app/api/channels/hooks/useChannelsQuery';
import { PaginatedResponseMeta } from 'app/api/types';
import { PageLoader } from 'app/components';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/channels';
import last from 'lodash/last';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useChannelsContext } from '../context';
import useFormBlocks from '../hooks/useFormBlocks';

const Container = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ShadowContainer = styled.div`
  box-shadow: 0px 0px 15px rgba(115, 117, 186, 0.08);
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%23D2CECDFF' stroke-width='2' stroke-dasharray='16%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`;

const EmptyContainer = styled.div`
  > div:first-child {
    height: 100%;
    > div:first-child {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

const ContentContainer = styled.div``;

const ChannelsList = () => {
  const [onScrollToEnd, setOnScrollToEnd] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { selectFormType, channels } = useChannelsContext();

  const dispatch = useDispatch();

  const { data, isLoading, fetchNextPage, remove } = useGetChannelsQuery({
    ranking: 'desc',
    onSuccess: (e) => {
      if (e) dispatch(actions.setChannels(e));
    },
    refetchOnWindowFocus: false,
  });

  const meta: PaginatedResponseMeta | undefined = last(data?.pages)?.data.meta;

  const scrollRef = useRef<HTMLDivElement>(null);

  const { blocks, length } = useFormBlocks(data);

  const {
    store: {
      actions: { deserialize },
    },
    selectedNodeId,
  } = useEditor((state, editor) => ({
    nodes: editor.getNodes(),
    selectedNodeId: state.events.selected,
  }));

  const setEditorContent = useCallback(() => {
    if (!blocks) return;
    deserialize(blocks);
  }, [deserialize, blocks]);

  useEffect(() => {
    setEditorContent();
  }, [setEditorContent]);

  useEffect(() => {
    if (selectedNodeId.has('ROOT')) {
      selectFormType('empty');
    }
  }, [selectFormType, selectedNodeId]);

  useEffect(() => {
    return () => {
      if (channels.length > 0) remove();
    };
  }, [channels.length, remove]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const unsubscribe = scrollRef.current.addEventListener('scroll', (e) => {
      const { offsetHeight, scrollHeight, scrollTop } =
        e.target as HTMLDivElement;

      const scrollDiff = scrollHeight - offsetHeight;

      if (scrollDiff - 30 < scrollTop) {
        setOnScrollToEnd(true);
      } else {
        setOnScrollToEnd(false);
      }
    });

    return unsubscribe;
  }, []);

  const loadMore = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      await fetchNextPage();
      setIsLoadingMore(false);
    } catch (error) {
      logger.error(error);
      setIsLoadingMore(false);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    if (!meta) return;
    if (onScrollToEnd && !isLoading && meta.currentPage < meta.lastPage) {
      loadMore();
    }
  }, [isLoading, loadMore, meta, onScrollToEnd]);

  const FrameContainer =
    length > 0 || channels.length > 0 ? ContentContainer : EmptyContainer;

  return (
    <Container
      ref={scrollRef}
      className={cx('col-span-8 relative over flex flex-col', {
        'overflow-hidden': isLoading,
        'overflow-y-scroll': !isLoading,
        'mb-4': isLoading,
      })}
    >
      <ShadowContainer
        className={cx(
          'absolute w-full h-full z-20  border-solid bg-white rounded-2xl border-hover-blue] ',
          {
            hidden: !isLoading,
          }
        )}
      >
        <PageLoader />
      </ShadowContainer>
      <FrameContainer className="pb-4 flex flex-col flex-1">
        <Frame />
        <div className={cx({ hidden: !isLoadingMore })}>
          <PageLoader />
        </div>
      </FrameContainer>
    </Container>
  );
};

export default ChannelsList;

import { resources, queryKeys } from 'app/api/chat';
import { MessagesResponse } from 'app/api/chat/types';
import { AxiosResponse } from 'axios';
import { useInfiniteQuery } from 'react-query';

const useMessages = (id: string) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      queryKeys.getMessages(id),
      ({ pageParam }) =>
        resources.getMessages({
          id,
          continuationToken: pageParam,
        }),
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage: AxiosResponse<MessagesResponse>) => {
          const { continuationToken, hasMore } = lastPage.data;
          if (!hasMore) return false;

          return continuationToken;
        },
        retry: false,
      }
    );

  const firstPage = data?.pages[0];
  const firstMessage = firstPage?.data.messages[0];

  return {
    messages: data?.pages,
    firstMessage,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasMore: data?.pages[data?.pages?.length - 1].data.hasMore,
  };
};

export default useMessages;

import { NonNegativeNumber } from 'common-ui/utils/nonNegativeNumber';
import { useInfiniteQuery } from 'react-query';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import { resources, queryKeys } from '../index';
import { ChannelsRanking } from '../types';

const useGetChannelsQuery = ({
  ranking,
  enabled,
  refetchOnWindowFocus = true,
  refetchOnMount = false,
  onSuccess,
}: {
  ranking: ChannelsRanking;
  enabled?: boolean;
  onSuccess?: (data: BasicChannelInfo[]) => void;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
}) => {
  const {
    data,
    isLoading,
    error,
    isFetching,
    isPreviousData,
    refetch,
    fetchNextPage,
    remove,
  } = useInfiniteQuery(
    queryKeys.channels({
      ranking,
      refetchOnWindowFocus,
      refetchOnMount,
    }),
    ({ pageParam }) =>
      resources.getChannels(
        NonNegativeNumber.create(pageParam || 0).value,
        ranking
      ),
    {
      enabled,
      refetchOnMount,
      refetchOnWindowFocus,
      refetchOnReconnect: false,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => lastPage.data.meta.currentPage + 1,
      onSuccess(res) {
        if (!res.pages) return;
        const lastIndex = res.pages.length - 1;
        const newData = res.pages[lastIndex].data.data;
        onSuccess && onSuccess(newData);
      },
    }
  );

  return {
    data,
    isFetching,
    isLoading,
    isPreviousData,
    error,
    refetch,
    fetchNextPage,
    remove,
  };
};

export default useGetChannelsQuery;

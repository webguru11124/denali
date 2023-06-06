import { NonNegativeNumber } from 'common-ui/utils/nonNegativeNumber';
import { useInfiniteQuery } from 'react-query';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import { resources, queryKeys } from '../index';
import { ChannelsRanking } from '../types';
const useGetRelevantChannelsQuery = ({
  ranking,
  enabled,
}: {
  ranking: ChannelsRanking;
  enabled?: boolean;
  onSuccess?: (data: BasicChannelInfo[]) => void;
  refetchOnWindowFocus?: boolean;
}) => {
  const {
    data,
    isLoading,
    error,
    isFetching,
    isPreviousData,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKeys.relevantChannels(),
    ({ pageParam }) =>
      resources.getRelevantChannels(
        NonNegativeNumber.create(pageParam || 0).value,
        ranking
      ),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage) => lastPage.data.meta.currentPage + 1,
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
  };
};
export default useGetRelevantChannelsQuery;

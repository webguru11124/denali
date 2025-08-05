import { queryKeys, resources } from 'app/api/missions';
import { CompletionStatus } from 'app/api/missions/constants';
import { reducePages } from 'app/utils';
import { useInfiniteQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { getTotalAmountFromPaginatedResponse } from '../utils';

import { OnResponseReceived } from './types';

const useUsersStatsQuery = (
  id: number,
  completionStatus: '' | CompletionStatus,
  searchQuery: string,
  onResponseReceived?: OnResponseReceived,
  locationId?: string
) => {
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    queryKeys.getUsersStats(id, completionStatus, debouncedQuery, locationId),
    ({ pageParam }) =>
      resources.getUsersStats({
        id,
        status: completionStatus,
        query: debouncedQuery,
        page: pageParam,
        perPage: 30,
        locationId,
      }),
    {
      getNextPageParam: (response) => response.data.meta.currentPage + 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (response) => {
        if (onResponseReceived) {
          onResponseReceived(getTotalAmountFromPaginatedResponse(response));
        }
      },
    }
  );

  const reducedData = reducePages(data);
  return {
    data: reducedData?.data,
    meta: reducedData?.meta,
    isLoading,
    isError,
    fetchNextPage,
  };
};

export default useUsersStatsQuery;

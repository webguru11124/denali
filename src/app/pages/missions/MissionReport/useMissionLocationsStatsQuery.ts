import { resources, queryKeys } from 'app/api/missions';
import { reducePages } from 'app/utils';
import { useInfiniteQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { getTotalAmountFromPaginatedResponse } from '../utils';

import { OnResponseReceived } from './types';

const useMissionLocationsStatsQuery = (
  id: number,
  searchQuery: string,
  onResponseReceived: OnResponseReceived
) => {
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    queryKeys.getMissionLocationsStats(id, debouncedQuery),
    ({ pageParam }) =>
      resources.getMissionLocationsStats(id, pageParam, debouncedQuery),
    {
      getNextPageParam: (response) => response.data.meta.currentPage + 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (response) => {
        onResponseReceived(getTotalAmountFromPaginatedResponse(response));
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

export default useMissionLocationsStatsQuery;

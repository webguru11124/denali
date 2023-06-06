import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetChannelQuery = (channelId: number, enabled?: boolean) => {
  const { data, isLoading, error, isFetching, isPreviousData, refetch } =
    useQuery(
      queryKeys.channel(channelId),
      () => resources.getChannel(channelId),
      { enabled }
    );

  return {
    data: data?.data,
    isFetching,
    isLoading,
    isPreviousData,
    refetch,
    error,
  };
};

export default useGetChannelQuery;

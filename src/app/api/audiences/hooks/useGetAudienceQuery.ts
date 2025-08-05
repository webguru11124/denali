import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetAudienceQuery = ({ id }: { id: number }) => {
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    queryKeys.audience(id),
    () => resources.getAudience(id)
  );

  return {
    data: data?.data?.data,
    isFetching,
    isLoading,
    error,
    refetch,
  };
};

export default useGetAudienceQuery;

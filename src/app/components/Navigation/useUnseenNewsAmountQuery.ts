import { resources, queryKeys } from 'app/api/news';
import { useQuery } from 'react-query';

const useUnseenNewsAmountQuery = (enabled: boolean) => {
  const { data, isLoading, isError, refetch } = useQuery(
    queryKeys.unseenAmount(),
    resources.getUnsenAmount,
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { data: data?.data?.count, isLoading, isError, refetch };
};

export default useUnseenNewsAmountQuery;

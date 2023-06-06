import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useQuizStatsQuery = (id: number) => {
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    queryKeys.getQuizStats(id),
    () => resources.getQuizStats(id),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return { data: selectData(data), isLoading, isFetching, isError, refetch };
};

export default useQuizStatsQuery;

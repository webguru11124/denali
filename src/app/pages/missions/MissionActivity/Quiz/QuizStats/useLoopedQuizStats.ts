import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useLoopedQuizStats = (activityId: number) => {
  const { data, isLoading, isError, refetch } = useQuery(
    queryKeys.getLoopedQuizStats(activityId),
    () => resources.getLoopedQuizStats(activityId),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return { data: selectData(data), isLoading, isError, refetch };
};

export default useLoopedQuizStats;

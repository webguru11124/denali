import { queryKeys, resources } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useMissionActivityQuery = (activityId: number, enabled = true) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getMissionActivity(activityId),
    () => resources.getMissionActivity(activityId),
    {
      enabled,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useMissionActivityQuery;

import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useMissionQuery = (id: number) => {
  const { data, isLoading, error } = useQuery(
    queryKeys.getMission(id),
    () => resources.getMission(id),
    {
      // refetchOnMount is left out intentionally
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: selectData(data), isLoading, error };
};

export default useMissionQuery;

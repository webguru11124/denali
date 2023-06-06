import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const DELAY_ID = -1;

const useMissionQuery = (id: number | undefined = DELAY_ID) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getMission(id),
    () => resources.getMission(id),
    {
      // refetchOnMount is left out intentionally
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: id !== DELAY_ID,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useMissionQuery;

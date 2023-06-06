import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useMissionStatsQuery = (id: number) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getMissionStats(id),
    () => resources.getMissionStats(id)
  );

  return { data: selectData(data), isLoading, isError };
};

export default useMissionStatsQuery;

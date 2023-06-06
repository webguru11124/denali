import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useMissionReportQuery = (id: number) => {
  const { data, isLoading, isError, refetch, remove } = useQuery(
    queryKeys.getMissionReport(id),
    () => resources.getMissionReport(id),
    {
      enabled: false,
    }
  );

  return { data: selectData(data), isLoading, isError, fetch: refetch, remove };
};

export default useMissionReportQuery;

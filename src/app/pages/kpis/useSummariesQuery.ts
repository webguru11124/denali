import { queryKeys, resources } from 'app/api/kpis';
import { GetSummariesRequest } from 'app/api/kpis/types';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useSummariesQuery = (requestData: GetSummariesRequest) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getSummaries(requestData),
    () => resources.getSummaries(requestData)
  );

  return { data: selectData(data), isLoading, isError };
};

export default useSummariesQuery;

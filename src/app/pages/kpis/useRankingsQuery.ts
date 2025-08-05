import { resources, queryKeys } from 'app/api/kpis';
import { GetRankingsRequest } from 'app/api/kpis/types';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useRankingsQuery = (requestData: GetRankingsRequest) => {
  const { isLoading, data, isError } = useQuery(
    queryKeys.getRankings(requestData),
    () => resources.getRankings(requestData)
  );

  const selectedData = selectData(data);
  return {
    locations: selectedData?.locations,
    users: selectedData?.users,
    updatedAt: selectedData?.updatedAt,
    isLoading,
    isError,
  };
};

export default useRankingsQuery;

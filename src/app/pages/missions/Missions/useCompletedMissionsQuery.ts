import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useCompletedMissionsQuery = (
  searchQuery: string,
  tags: Array<string>
) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getCompletedMissions(searchQuery, tags),
    () =>
      resources.getCompletedMissions({
        page: 0,
        perPage: 20,
        tags,
        query: searchQuery,
      })
  );

  return { data: selectData(data), isLoading, isError };
};

export default useCompletedMissionsQuery;

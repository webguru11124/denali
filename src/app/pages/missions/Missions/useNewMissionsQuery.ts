import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useNewMissionsQuery = (searchQuery: string, tags: Array<string>) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getNewMissions(searchQuery, tags),
    () =>
      resources.getNewMissions({
        page: 0,
        perPage: 20,
        tags,
        query: searchQuery,
      })
  );

  return { data: selectData(data), isLoading, isError };
};

export default useNewMissionsQuery;

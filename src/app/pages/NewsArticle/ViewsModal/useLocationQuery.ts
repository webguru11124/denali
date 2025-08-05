import { resources, queryKeys } from 'app/api/news';
import { useQuery } from 'react-query';

const useLocationQuery = (articleId: number, locationId: number) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.seenLocation(articleId, locationId),
    () => resources.getSeenLocation(articleId, locationId),
    {
      refetchOnMount: false,
    }
  );

  return { data: data?.data, isLoading, isError };
};

export default useLocationQuery;

import { resources, queryKeys } from 'app/api/news';
import { useQuery } from 'react-query';

const useNewsFeedQuery = () => {
  const { data, isLoading, error, isFetching } = useQuery(
    queryKeys.categories(),
    () => resources.getCategories()
  );

  return {
    data: data?.data?.data,
    isFetching,
    isLoading,
    error,
  };
};

export default useNewsFeedQuery;

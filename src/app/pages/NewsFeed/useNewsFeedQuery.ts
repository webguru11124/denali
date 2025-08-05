import { resources, queryKeys } from 'app/api/news';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

interface Data {
  query: string;
  category: string;
  enabled: boolean;
}

const useNewsFeedQuery = ({ query, category, enabled }: Data) => {
  const { data, isLoading, error, isFetching } = useQuery(
    queryKeys.relevant(query, category),
    () => resources.getNews(query, category),
    {
      enabled,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // 1 minute
      staleTime: 1000 * 60,
    }
  );

  const extractedData = selectData(data);

  return {
    data: extractedData,
    isFetching,
    isLoading,
    error,
  };
};

export default useNewsFeedQuery;

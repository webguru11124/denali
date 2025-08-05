import { resources, queryKeys } from 'app/api/news';
import { useQuery } from 'react-query';

const useTeamsQuery = (articleId: number) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.articleSeenUsers(articleId),
    () => resources.getArticleSeenUsers(articleId),
    {
      refetchOnMount: false,
    }
  );

  return { data: data?.data?.data, isLoading, isError };
};

export default useTeamsQuery;

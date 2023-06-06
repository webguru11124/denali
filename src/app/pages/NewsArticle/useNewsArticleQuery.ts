import { resources, queryKeys } from 'app/api/news';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const useNewsArticleQuery = (id: number) => {
  const queryClient = useQueryClient();
  const articleQueryContext = queryKeys.newsArticle(id);
  const { data, isLoading, error } = useQuery(articleQueryContext, () =>
    resources.getNewsArticle(id)
  );
  const articleData = data?.data?.data;
  useEffect(() => {
    // data AND articleData is included to prevent TS error
    if (data && articleData && !articleData.seenByMe) {
      queryClient.invalidateQueries(queryKeys.unseenAmount());
      queryClient.setQueryData(articleQueryContext, {
        ...data,
        data: {
          ...data.data,
          data: {
            ...articleData,
            seenByMe: true,
          },
        },
      });
    }
  }, [articleData, articleQueryContext, data, queryClient]);

  return { data: articleData, isLoading, error };
};

export default useNewsArticleQuery;

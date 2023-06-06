import { NewsDataResponseProps } from 'app/api/news/types';
import { selectData } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import queryKeys from '../queryKeys';
import { getNewsArticle } from '../resources';

const useNewsArticleQuery = (id: number) => {
  const queryClient = useQueryClient();

  const articleQueryContext = queryKeys.newsArticle(id);
  const { data, isLoading, error } = useQuery(
    articleQueryContext,
    () => getNewsArticle(id),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const articleData = selectData(data);
  useEffect(() => {
    // data AND articleData is included to prevent TS error
    const newsFeedQueryKey = queryKeys.relevant('', '');

    if (data && articleData && !articleData.seenByMe) {
      queryClient.setQueriesData<
        AxiosResponse<NewsDataResponseProps> | undefined
      >(newsFeedQueryKey, (newsFeed) => {
        if (!newsFeed) return undefined;
        return {
          ...newsFeed,
          data: {
            ...newsFeed.data,
            data: newsFeed.data.data.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  seenByMe: true,
                  totalUsersSeen: item.totalUsersSeen + 1,
                };
              }

              return item;
            }),
          },
        };
      });

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
  }, [articleData, articleQueryContext, data, id, queryClient]);

  return { data: articleData, isLoading, error };
};

export default useNewsArticleQuery;

import { hooks } from 'app/api/auth';
import { resources, types, queryKeys } from 'app/api/news';
import {
  NewsDataResponseProps,
  NewsArticleResponseProps,
} from 'app/api/news/types';
import { prependPaginatedQueryItem } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const baseCommentData = {
  applaudByMe: false,
  applaudCount: 0,
  createdByMe: true,
  id: 0,
  userId: 0,
};

const { useAuthenticatedUser } = hooks;

const useArticleCommentMutation = (id: number) => {
  const queryClient = useQueryClient();
  const { data: userData } = useAuthenticatedUser();
  const mutationContext = ['news-article-comments', id];
  const { mutate, isLoading, isError } = useMutation(
    (commentData: types.CommentData) =>
      resources.commentNewsArticle(id, commentData),
    {
      onMutate: async ({ content }) => {
        if (!userData) return undefined;

        const newFeedQueryKey = queryKeys.relevant('', '');
        const newArticleQueryKey = queryKeys.newsArticle(id);

        // Update article content
        queryClient.setQueriesData<
          AxiosResponse<NewsArticleResponseProps> | undefined
        >(newArticleQueryKey, (newsArticle) => {
          if (!newsArticle) return undefined;

          return {
            ...newsArticle,
            data: {
              ...newsArticle.data,
              data: {
                ...newsArticle.data.data,
                commentsCount: newsArticle.data.data.commentsCount + 1,
              },
            },
          };
        });
        // Update news feed content
        queryClient.setQueryData<
          AxiosResponse<NewsDataResponseProps> | undefined
        >(newFeedQueryKey, (newsFeed) => {
          if (!newsFeed) return undefined;

          return {
            ...newsFeed,
            data: {
              ...newsFeed.data,
              data: newsFeed.data.data.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    commentsCount: item.commentsCount + 1,
                  };
                }

                return item;
              }),
            },
          };
        });
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(mutationContext);

        // Snapshot the previous value
        const prevComments =
          queryClient.getQueryData<
            InfiniteData<AxiosResponse<types.NewsArticleCommentsResponse>>
          >(mutationContext);

        if (prevComments) {
          // Optimistically update to the new value
          queryClient.setQueryData(mutationContext, () => {
            const updatedData = prependPaginatedQueryItem(prevComments, {
              ...baseCommentData,
              userName: userData.name,
              userAvatars: userData.avatars,
              userLocation: userData.location,
              text: content,
              createdAt: new Date().toString(),
            });

            if (updatedData) return updatedData;
            return prevComments;
          });
        }

        // Return a context object with the snapshotted value
        return { prevComments };
      },
      onSettled: () => {
        queryClient.invalidateQueries(mutationContext);
      },
    }
  );

  return {
    mutate: (data: types.CommentData) => mutate(data),
    isLoading,
    isError,
  };
};

export default useArticleCommentMutation;

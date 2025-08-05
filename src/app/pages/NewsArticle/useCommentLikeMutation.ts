import { resources, queryKeys, types } from 'app/api/news';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const useEditCommentMutation = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutationContext = queryKeys.articleComments(articleId);
  const { mutate, isLoading, isError } = useMutation(
    (commentId: number) => resources.likeComment(articleId, commentId),
    {
      onMutate: async (commentId) => {
        await queryClient.cancelQueries(mutationContext);

        const currentComments =
          queryClient.getQueryData<
            InfiniteData<AxiosResponse<types.NewsArticleCommentsResponse>>
          >(mutationContext);
        if (currentComments) {
          // Optimistically update cache
          const updatedComments = mapPaginatedQuery<types.Comment>(
            currentComments,
            ({ id, applaudByMe, applaudCount, ...rest }) => {
              if (id === commentId) {
                const nextAplaudState = !applaudByMe;
                return {
                  ...rest,
                  id,
                  applaudByMe: nextAplaudState,
                  applaudCount: applaudCount + (nextAplaudState ? 1 : -1),
                };
              }
              return {
                id,
                applaudByMe,
                applaudCount,
                ...rest,
              };
            }
          );

          queryClient.setQueryData(mutationContext, updatedComments);
        }

        return { currentComments };
      },
      onSettled: () => {
        queryClient.invalidateQueries(mutationContext);
      },
    }
  );

  return { like: mutate, isLoading, isError };
};

export default useEditCommentMutation;

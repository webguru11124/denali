import { resources, queryKeys, types } from 'app/api/news';
import { filterPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const useEditCommentMutation = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutationContext = queryKeys.articleComments(articleId);
  const { mutate, isLoading, isError } = useMutation(
    (commentId: number) => resources.deleteArticleComment(articleId, commentId),
    {
      onMutate: async (commentId) => {
        await queryClient.cancelQueries(mutationContext);

        const currentComments =
          queryClient.getQueryData<
            InfiniteData<AxiosResponse<types.NewsArticleCommentsResponse>>
          >(mutationContext);
        if (currentComments) {
          // Optimistically update cache
          const updatedComments = filterPaginatedQuery<types.Comment>(
            currentComments,
            ({ id }) => id !== commentId
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

  return { delete: mutate, isLoading, isError };
};

export default useEditCommentMutation;

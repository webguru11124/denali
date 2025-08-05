import { resources, queryKeys, types } from 'app/api/news';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

interface Mutation {
  commentId: number;
  content: string;
}

const useEditCommentMutation = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutationContext = queryKeys.articleComments(articleId);
  const { mutate, isLoading, isError } = useMutation(
    ({ commentId, content }: Mutation) =>
      resources.editArticleComment(articleId, commentId, content),
    {
      onMutate: async ({ commentId, content }) => {
        await queryClient.cancelQueries(mutationContext);

        const currentComments =
          queryClient.getQueryData<
            InfiniteData<AxiosResponse<types.NewsArticleCommentsResponse>>
          >(mutationContext);
        if (currentComments) {
          // Optimistically update cache
          const updatedComments = mapPaginatedQuery<types.Comment>(
            currentComments,
            ({ id, ...rest }) => {
              if (id === commentId) {
                return {
                  ...rest,
                  id,
                  text: content,
                };
              }
              return {
                id,
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

  return { edit: mutate, isLoading, isError };
};

export default useEditCommentMutation;

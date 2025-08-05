import { resources, queryKeys, types } from 'app/api/news';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useArticleLikeMutation = (id: number) => {
  const queryClient = useQueryClient();
  const mutationContext = queryKeys.newsArticle(id);
  const { mutate, isLoading } = useMutation(() => resources.likeArticle(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(mutationContext);

      const prevArticle =
        queryClient.getQueryData<AxiosResponse<types.NewsArticleResponseProps>>(
          mutationContext
        );

      if (prevArticle) {
        queryClient.setQueryData(mutationContext, () => {
          const likeState = !prevArticle.data.data.likedByMe;
          const articleData = prevArticle.data.data;
          return {
            ...prevArticle,
            data: {
              ...prevArticle.data,
              data: {
                ...articleData,
                likedByMe: likeState,
                totalUsersLike:
                  articleData.totalUsersLike + (likeState ? 1 : -1),
              },
            },
          };
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(mutationContext);
    },
  });

  return { mutate, isLoading };
};
export default useArticleLikeMutation;

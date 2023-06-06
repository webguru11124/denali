import { resources, queryKeys } from 'app/api/news';
import { NewsArticleResponseProps } from 'app/api/news/types';
import { getPercentage } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const usePostVoteMutation = (id: number) => {
  const queryClient = useQueryClient();
  const articleQueryKey = queryKeys.newsArticle(id);
  const { mutate, isLoading, isError } = useMutation(resources.postVote, {
    onMutate: async ({ answerId }) => {
      await queryClient.cancelQueries(articleQueryKey);

      queryClient.setQueryData<
        AxiosResponse<NewsArticleResponseProps> | undefined
      >(articleQueryKey, (cache) => {
        if (!cache) return undefined;
        const { answers } = cache.data.data.poll;
        const totalVoteCount =
          answers.reduce((acc, { voteCount }) => acc + voteCount, 0) + 1;
        return {
          ...cache,
          data: {
            ...cache.data,
            data: {
              ...cache.data.data,
              poll: {
                ...cache.data.data.poll,
                votedByMe: 1,
                mySelectedAnswerId: answerId,
                answers: answers.map((answer) => {
                  if (answer.id !== answerId) {
                    return {
                      ...answer,
                      percent: String(
                        getPercentage(answer.voteCount, totalVoteCount)
                      ),
                    };
                  }
                  const currentVoteCount = answer.voteCount + 1;
                  return {
                    ...answer,
                    voteCount: currentVoteCount,
                    percent: String(
                      getPercentage(currentVoteCount, totalVoteCount)
                    ),
                  };
                }),
              },
            },
          },
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(articleQueryKey);
    },
  });

  return { mutate, isLoading, isError };
};

export default usePostVoteMutation;

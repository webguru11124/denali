import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { filterPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const usePostDeleteMutation = () => {
  const { data: user } = useAuthenticatedUser();

  if (!user) throw new Error('[usePostDeleteMutation]: no authenticated user');

  const queryClient = useQueryClient();
  const queryKey = queryKeys.getSocialFeed(user.contentLanguage.current.id);
  const { mutate, isLoading, isError } = useMutation(resources.deletePost, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData<
        InfiniteData<AxiosResponse<types.SocialFeedResponse>> | undefined
      >(queryKey, (socialFeed) => {
        if (!socialFeed) return undefined;
        return filterPaginatedQuery<types.Post>(
          socialFeed,
          ({ id }) => id !== postId
        );
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return { mutate, isLoading, isError };
};

export default usePostDeleteMutation;

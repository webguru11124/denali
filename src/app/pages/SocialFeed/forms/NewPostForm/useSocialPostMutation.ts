import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { prependPaginatedQueryItem } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const useSocialPostMutation = () => {
  const { data: user } = useAuthenticatedUser();

  if (!user) throw new Error('[useSocialPostMutation]: no authenticated user');

  const queryClient = useQueryClient();
  const queryKey = queryKeys.getSocialFeed(user.contentLanguage.current.id);
  const { mutate, isLoading, isError } = useMutation(resources.postSocialPost, {
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(queryKey);

      queryClient.setQueryData<
        InfiniteData<AxiosResponse<types.SocialFeedResponse>> | undefined
      >(queryKey, (prevSocialPosts) => {
        if (!prevSocialPosts) return undefined;

        return prependPaginatedQueryItem(prevSocialPosts, {
          activityFeedId: null,
          activityPost: null,
          applaudCount: 0,
          applauded: false,
          avatars: user.avatars,
          dateIndex: 0,
          files: [],
          id: 0,
          isCompetition: null,
          languageCode: user.contentLanguage.current.code,
          locationId: user.location.id,
          locationName: user.location.name,
          login: '',
          markdown: false,
          name: user.name,
          parentFeedId: null,
          quesType: null,
          replies: [],
          text: newPost.content,
          textId: 0,
          timeago: 'Now',
          title: null,
          userId: user.id,
        });
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return { mutate, isLoading, isError };
};

export default useSocialPostMutation;

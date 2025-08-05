import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { UserProfile } from 'app/api/auth/types';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const updatePost = (
  { replies, ...rest }: types.Post,
  data: types.CommentData,
  user: UserProfile
) => ({
  ...rest,
  replies: [
    ...replies,
    {
      activityFeedId: null,
      activityPost: null,
      applaudCount: 0,
      applauded: false,
      avatars: user.avatars,
      dateIndex: 0,
      feedId: 0,
      files: [],
      id: Math.random(),
      isCompetition: null,
      locationName: user.location.name,
      login: null,
      markdown: false,
      name: user.name,
      quesType: null,
      replies: null,
      text: data.content,
      textId: 0,
      timeago: 'Now',
      title: null,
      userId: user.id,
    },
  ],
});

const usePostCommentMutation = (id: number) => {
  const { data: user } = useAuthenticatedUser();

  if (!user) throw new Error('[usePostCommentMutation]: no authenticated user');

  const socialFeedQueryKey = queryKeys.getSocialFeed(
    user.contentLanguage.current.id
  );

  const socialPostQueryKey = queryKeys.getSocialPost(id);

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data: types.CommentData) => resources.commentPost(id, data),
    {
      onMutate: async (data) => {
        if (!user) return;

        await queryClient.cancelQueries(socialFeedQueryKey);
        await queryClient.cancelQueries(socialPostQueryKey);

        // Update single post
        queryClient.setQueryData<
          AxiosResponse<types.SocialPostResponse> | undefined
        >(socialPostQueryKey, (postData) => {
          if (!postData) return undefined;

          return {
            ...postData,
            data: {
              ...postData.data,
              data: updatePost(postData.data.data, data, user),
            },
          };
        });

        // Update social feed
        queryClient.setQueryData<
          InfiniteData<AxiosResponse<types.SocialFeedResponse>> | undefined
        >(socialFeedQueryKey, (currentSocialFeed) => {
          if (!currentSocialFeed) return undefined;
          return mapPaginatedQuery<types.Post>(
            currentSocialFeed,
            ({ id: postId, ...rest }) => {
              if (postId === id) {
                return updatePost({ id: postId, ...rest }, data, user);
              }

              return {
                ...rest,
                id: postId,
              };
            }
          );
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(socialPostQueryKey);
        queryClient.invalidateQueries(socialFeedQueryKey);
      },
    }
  );

  return { comment: mutate, isLoading, isError };
};

export default usePostCommentMutation;

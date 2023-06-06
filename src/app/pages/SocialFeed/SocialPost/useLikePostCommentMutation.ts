import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const updatePost = (
  { id, replies, ...rest }: types.Post,
  commentId: number
) => ({
  ...rest,
  replies: replies.map(
    ({ id: replyId, applaudCount, applauded, ...restReply }) => {
      if (commentId === replyId) {
        const nextApplaudState = !applauded;
        return {
          ...restReply,
          applauded: nextApplaudState,
          applaudCount: nextApplaudState ? applaudCount + 1 : applaudCount - 1,
          id: replyId,
        };
      }
      return {
        ...restReply,
        applauded,
        applaudCount,
        id: replyId,
      };
    }
  ),
  id,
});

const usePostCommentMutation = (postId: number) => {
  const { data: user } = useAuthenticatedUser();

  if (!user) throw new Error('[usePostCommentMutation]: no authenticated user');

  const socialFeedQueryKey = queryKeys.getSocialFeed(
    user.contentLanguage.current.id
  );
  const socialPostQueryKey = queryKeys.getSocialPost(postId);

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    (commentId: number) => resources.likePostComment(postId, commentId),
    {
      onMutate: async (commentId: number) => {
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
              ...postData,
              data: updatePost(postData?.data?.data, commentId),
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
            ({ id, ...rest }) => {
              if (id === postId) {
                return updatePost({ id, ...rest }, commentId);
              }

              return {
                ...rest,
                id,
              };
            }
          );
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(socialFeedQueryKey);
        queryClient.invalidateQueries(socialPostQueryKey);
      },
    }
  );

  return { likeComment: mutate, isLoading, isError };
};

export default usePostCommentMutation;

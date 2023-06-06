import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const updatePost = (post: types.Post, commentId: number) => ({
  ...post,
  replies: post.replies.filter(({ id }) => id !== commentId),
});

const useDeletePostCommentMutation = (postId: number) => {
  const { data: user } = useAuthenticatedUser();

  if (!user)
    throw new Error('[useDeletePostCommentMutation]: no authenticated user');

  const socialFeedQueryKey = queryKeys.getSocialFeed(
    user.contentLanguage.current.id
  );
  const socialPostQueryKey = queryKeys.getSocialPost(postId);
  const queryClient = useQueryClient();
  const { mutate, isError, isLoading } = useMutation(
    (commentId: number) => resources.deletePostComment(postId, commentId),
    {
      onMutate: async (commentId) => {
        await queryClient.cancelQueries(socialFeedQueryKey);
        await queryClient.cancelQueries(socialPostQueryKey);

        // Update social post
        queryClient.setQueryData<
          AxiosResponse<types.SocialPostResponse> | undefined
        >(socialPostQueryKey, (postData) => {
          if (!postData) return undefined;

          return {
            ...postData,
            data: {
              ...postData.data,
              data: updatePost(postData.data.data, commentId),
            },
          };
        });

        // Update social feed
        queryClient.setQueryData<
          InfiniteData<AxiosResponse<types.SocialFeedResponse>> | undefined
        >(socialFeedQueryKey, (socialFeed) => {
          if (!socialFeed) return undefined;

          return mapPaginatedQuery<types.Post>(
            socialFeed,
            ({ id, ...rest }) => {
              if (id !== postId) return { id, ...rest };

              return updatePost({ id, ...rest }, commentId);
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

  return {
    deleteComment: mutate,
    isLoading,
    isError,
  };
};

export default useDeletePostCommentMutation;

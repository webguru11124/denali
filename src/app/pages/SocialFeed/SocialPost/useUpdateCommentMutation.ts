import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

interface MutationData {
  postId: number;
  commentId: number;
  data: {
    content: string;
  };
}

const updatePost = (
  { id, replies, ...rest }: types.Post,
  commentId: number,
  content: string
) => ({
  ...rest,
  id,
  replies: replies.map(({ id: replyId, ...restReply }) => {
    if (replyId === commentId) {
      return {
        ...restReply,
        id: replyId,
        text: content,
      };
    }

    return {
      ...restReply,
      id: replyId,
    };
  }),
});

const useUpdateCommentMutation = () => {
  const { data: user } = useAuthenticatedUser();

  if (!user)
    throw new Error('[useUpdateCommentMutation]: no authenticated user');

  const socialFeedQueryKey = queryKeys.getSocialFeed(
    user.contentLanguage.current.id
  );

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    ({ postId, commentId, data }: MutationData) =>
      resources.updateComment(postId, commentId, data),
    {
      onMutate: async ({ commentId, postId, data: { content } }) => {
        const socialPostQueryKey = queryKeys.getSocialPost(postId);

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
              data: updatePost(postData.data.data, commentId, content),
            },
          };
        });

        // Update social feed
        queryClient.setQueryData<
          InfiniteData<AxiosResponse<types.SocialFeedResponse>> | undefined
        >(socialFeedQueryKey, (currentSocialFeed) => {
          if (!currentSocialFeed) return currentSocialFeed;

          return mapPaginatedQuery<types.Post>(
            currentSocialFeed,
            ({ id, ...rest }) => {
              if (postId === id) {
                return updatePost({ id, ...rest }, commentId, content);
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
      },
    }
  );

  return { updateComment: mutate, isLoading, isError };
};

export default useUpdateCommentMutation;

import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { queryKeys, resources, types } from 'app/api/socialFeed';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const updatePost = ({ id, applauded, applaudCount, ...rest }: types.Post) => {
  const nextApplaudState = !applauded;
  return {
    ...rest,
    id,
    applaudCount: nextApplaudState ? applaudCount + 1 : applaudCount - 1,
    applauded: nextApplaudState,
  };
};

const usePostLikeMutation = () => {
  const { data: user } = useAuthenticatedUser();
  if (!user) throw new Error('[usePostLikeMutation]: no authenticated user');

  const socialFeedQueryKey = queryKeys.getSocialFeed(
    user.contentLanguage.current.id
  );
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(resources.likePost, {
    onMutate: async (postId) => {
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
            data: updatePost(postData.data.data),
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
              return updatePost({ id, ...rest });
            }

            return {
              id,
              ...rest,
            };
          }
        );
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(socialFeedQueryKey);
    },
  });

  return { like: mutate, isLoading, isError };
};

export default usePostLikeMutation;

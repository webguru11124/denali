import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys, types } from 'app/api/socialFeed';
import { mapPaginatedQuery } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';

const useUpdatePostMutation = (id: number) => {
  const { data: user } = useAuthenticatedUser();

  if (!user) throw new Error('[useUpdatePostMutation]: no authenticated user');

  const queryClient = useQueryClient();
  const queryKey = queryKeys.getSocialFeed(user.contentLanguage.current.id);
  const { mutate, isLoading, isError } = useMutation(
    (data: types.UpdatePostData) => resources.updatePost(id, data),
    {
      onMutate: async (updatedPostData) => {
        await queryClient.cancelQueries(queryKey);

        queryClient.setQueryData<
          InfiniteData<AxiosResponse<types.SocialFeedResponse>> | undefined
        >(queryKey, (socialFeed) => {
          if (!socialFeed) return undefined;

          const updatedData = mapPaginatedQuery<types.Post>(
            socialFeed,
            (post) => {
              if (id === post.id) {
                const filesToRemoveIds = updatedPostData.filesToRemove.map(
                  ({ id: fileId }) => fileId
                );
                return {
                  ...post,
                  text: updatedPostData.content,
                  files: post.files.filter(
                    ({ id: fileId }) =>
                      !filesToRemoveIds.includes(fileId.toString())
                  ),
                };
              }

              return post;
            }
          );

          return updatedData;
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useUpdatePostMutation;

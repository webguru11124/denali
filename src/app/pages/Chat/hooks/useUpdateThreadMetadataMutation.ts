import { resources, queryKeys } from 'app/api/chat';
import { ThreadMetadataUpdateRequest } from 'app/api/chat/resources/updateThreadMetadata';
import { ThreadsResponse } from 'app/api/chat/types';
import { logger } from 'app/utils';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateThreadMetadataMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation<
    AxiosResponse<void>,
    unknown,
    ThreadMetadataUpdateRequest,
    { previousThreads: AxiosResponse<ThreadsResponse> | undefined }
  >(resources.updateThreadMetadata, {
    onMutate: async ({ threadId, lastMessageReadOn }) => {
      await queryClient.cancelQueries(queryKeys.getThreads());

      const previousThreads = queryClient.getQueryData<
        AxiosResponse<ThreadsResponse>
      >(queryKeys.getThreads());

      queryClient.setQueryData<AxiosResponse<ThreadsResponse> | undefined>(
        queryKeys.getThreads(),
        (cache) => {
          if (!cache) return undefined;
          return {
            ...cache,
            data: cache.data.map((thread) => {
              if (thread.id !== threadId) return thread;

              return {
                ...thread,
                lastMessageReadOn: lastMessageReadOn.toISOString(),
              };
            }),
          };
        }
      );

      return { previousThreads };
    },
    onError: (error, _, snapshot) => {
      logger.error(error);

      if (snapshot?.previousThreads) {
        queryClient.setQueryData(
          queryKeys.getThreads(),
          snapshot.previousThreads
        );
      }
      queryClient.invalidateQueries(queryKeys.getThreads());
    },
  });

  return { updateThreadMetadata: mutate, isLoading, isError };
};

export default useUpdateThreadMetadataMutation;

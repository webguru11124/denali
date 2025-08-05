import { resources, queryKeys } from 'app/api/chat';
import { UpdateThreadRequest, Thread } from 'app/api/chat/types';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { ThreadsCache } from '../types';

const useUpdateThreadMutation = (id: string) => {
  const threadQueryKey = queryKeys.getThread(id);
  const allThreadsQueryKey = queryKeys.getThreads();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    (data: UpdateThreadRequest) => resources.updateThread(id, data),
    {
      onMutate: async ({ topic: title }) => {
        await queryClient.cancelQueries(threadQueryKey);
        await queryClient.cancelQueries(allThreadsQueryKey);

        queryClient.setQueryData<ThreadsCache | undefined>(
          allThreadsQueryKey,
          (cache) => {
            if (!cache) return cache;
            return {
              ...cache,
              data: [
                ...cache.data.map(({ id: threadId, ...rest }) => {
                  if (threadId !== id) {
                    return {
                      id: threadId,
                      ...rest,
                    };
                  }

                  return {
                    id: threadId,
                    ...rest,
                    topic: title,
                  };
                }),
              ],
            };
          }
        );

        queryClient.setQueryData<AxiosResponse<Thread> | undefined>(
          threadQueryKey,
          (data) => {
            if (!data) return undefined;

            return {
              ...data,
              data: {
                ...data.data,
                topic: title,
              },
            };
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(threadQueryKey);
        queryClient.invalidateQueries(allThreadsQueryKey);
        queryClient.invalidateQueries(queryKeys.getMessages(id));
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useUpdateThreadMutation;

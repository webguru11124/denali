import { resources, queryKeys } from 'app/api/chat';
import { useMutation, useQueryClient } from 'react-query';

import { ThreadsCache } from '../types';

const useRemoveThreadMutation = () => {
  const threadsQueryKey = queryKeys.getThreads();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    (threadId: string) => resources.removeThread(threadId),
    {
      onMutate: async (threadId) => {
        await queryClient.cancelQueries(threadsQueryKey);
        queryClient.setQueryData<ThreadsCache | undefined>(
          threadsQueryKey,
          (data) => {
            if (!data) return undefined;

            return {
              ...data,
              data: data.data.map(({ id, ...rest }) => {
                if (id !== threadId) {
                  return {
                    id,
                    ...rest,
                  };
                }

                return {
                  id,
                  ...rest,
                  deletedOn: new Date().toString(),
                };
              }),
            };
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(threadsQueryKey);
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useRemoveThreadMutation;

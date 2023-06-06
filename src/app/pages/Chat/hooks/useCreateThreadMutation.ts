import { resources, queryKeys } from 'app/api/chat';
import { useMutation, useQueryClient } from 'react-query';

const useCreateThreadMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, isError } = useMutation(
    resources.createThread,
    {
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.getThreads());
      },
    }
  );

  return { mutate, data, isLoading, isError };
};

export default useCreateThreadMutation;

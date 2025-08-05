import { resources, queryKeys } from 'app/api/chat';
import { useMutation, useQueryClient } from 'react-query';

const useCreateDirectConversationMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    resources.createDirectConversation,
    {
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.getThreads());
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useCreateDirectConversationMutation;

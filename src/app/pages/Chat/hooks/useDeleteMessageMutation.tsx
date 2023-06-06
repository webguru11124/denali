import { resources, queryKeys } from 'app/api/chat';
import { useMutation, useQueryClient } from 'react-query';

import { ThreadMessagesCache } from '../types';
import { markMessageAsDeletedInCache } from '../utils';

const useDeleteMessageMutation = ({ threadId }: { threadId: string }) => {
  const queryClient = useQueryClient();
  const messagesQueryKey = queryKeys.getMessages(threadId);
  const { mutate, isLoading, isError } = useMutation(
    ({ messageId }: { messageId: string }) =>
      resources.deleteMessage({ messageId, threadId }),
    {
      onMutate: async ({ messageId }) => {
        await queryClient.cancelQueries(messagesQueryKey);
        queryClient.setQueryData<ThreadMessagesCache | undefined>(
          messagesQueryKey,
          (cache) => {
            if (!cache) return undefined;

            return markMessageAsDeletedInCache(cache, messageId);
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(messagesQueryKey);
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useDeleteMessageMutation;

import { resources, queryKeys } from 'app/api/chat';
import { ThreadParticipantsResponse } from 'app/api/chat/types';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useRemoveParticipantMutation = (threadId: string) => {
  const queryClient = useQueryClient();
  const messagesQueryKey = queryKeys.getMessages(threadId);
  const threadParticipantsQueryKey = queryKeys.getThreadParticipants(threadId);
  const { mutate, isLoading, isError } = useMutation(
    (participantId: string | number) =>
      resources.removeParticipant({
        threadId,
        participantId,
      }),
    {
      onMutate: async (participantId) => {
        await queryClient.cancelQueries(threadParticipantsQueryKey);

        queryClient.setQueryData<
          AxiosResponse<ThreadParticipantsResponse> | undefined
        >(threadParticipantsQueryKey, (cache) => {
          if (!cache) return undefined;

          return {
            ...cache,
            data: cache.data.filter(({ userId }) => userId !== participantId),
          };
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(messagesQueryKey);
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useRemoveParticipantMutation;

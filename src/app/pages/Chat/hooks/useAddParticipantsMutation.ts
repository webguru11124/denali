import { resources, queryKeys } from 'app/api/chat';
import {
  AvailableParticipant,
  ThreadParticipantsResponse,
} from 'app/api/chat/types';
import avatarPlaceholder from 'assets/images/avatar-placeholder.png';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface MutationData {
  // Is used in onMutate method to optimistically update participants list
  participants: Array<AvailableParticipant>;
}

const useAddParticipantsMutation = (threadId: string) => {
  const queryClient = useQueryClient();
  const threadParticipantsKey = queryKeys.getThreadParticipants(threadId);

  const { mutate, isLoading, isError } = useMutation(
    ({ participants }: MutationData) =>
      resources.addParticipants(
        threadId,
        participants.map(({ id }) => id)
      ),
    {
      onMutate: async ({ participants }) => {
        await queryClient.cancelQueries(threadParticipantsKey);
        queryClient.setQueryData<
          AxiosResponse<ThreadParticipantsResponse> | undefined
        >(threadParticipantsKey, (data) => {
          if (!data) return undefined;

          return {
            ...data,
            data: [
              ...data.data,
              ...participants.map(
                ({ locations, professions, fullName, id }) => ({
                  communicationUserId: '',
                  location: locations?.[0],
                  profession: professions?.[0],
                  avatarUrl: avatarPlaceholder,
                  name: fullName,
                  userId: id,
                })
              ),
            ],
          };
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(threadParticipantsKey);
        queryClient.invalidateQueries(queryKeys.getMessages(threadId));
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default useAddParticipantsMutation;

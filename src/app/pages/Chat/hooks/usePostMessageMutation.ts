import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { UserProfile } from 'app/api/auth/types';
import { resources, queryKeys } from 'app/api/chat';
import { ChatMessageType } from 'app/api/chat/constants';
import { PostMessageRequest } from 'app/api/chat/types';
import { dayjs } from 'app/utils';
import { useMutation, useQueryClient } from 'react-query';

import { ThreadMessagesCache, UnionMessage } from '../types';
import { getLatestSequenceId, insertAsLastMessage } from '../utils';

const createMessage = (
  data: PostMessageRequest,
  user: UserProfile,
  sequenceId: number
): UnionMessage => {
  const clientId = String(data.clientId);

  return {
    id: clientId,
    type: ChatMessageType.text,
    version: '1',
    createdOn: dayjs().toISOString(),
    sender: {
      kind: 'communicationUser',
      communicationUserId: '',
      userId: user.id,
      fullName: user.name,
    },
    isMine: true,
    isResponseReceived: false,
    // TODO: add optmistic update to files
    files: [],
    content: {
      message: data.text,
    },
    metadata: {
      clientId,
    },
    sequenceId: String(sequenceId),
    reply: data.reply,
  };
};

interface Options {
  threadId: string;
  onMutate?: () => void;
}

const usePostMessageMutation = ({ threadId, onMutate }: Options) => {
  const { data: user } = useAuthenticatedUser();
  const queryClient = useQueryClient();
  const threadQueryKey = queryKeys.getMessages(threadId);
  const { mutate, isLoading, isError } = useMutation(
    (request: PostMessageRequest) => resources.postMessage(threadId, request),
    {
      onMutate: async (data) => {
        if (!user)
          throw new Error('[usePostMessageMutation]: No authenticated user');

        await queryClient.cancelQueries(threadQueryKey);
        queryClient.setQueryData<ThreadMessagesCache | undefined>(
          threadQueryKey,
          (cache) => {
            if (!cache) return undefined;
            const latestSequenceId = getLatestSequenceId(cache);

            return insertAsLastMessage(
              createMessage(data, user, latestSequenceId + 1),
              cache
            );
          }
        );
        onMutate?.();
      },
      onSuccess: async () => {
        await queryClient.refetchQueries(threadQueryKey);
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default usePostMessageMutation;

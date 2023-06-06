import {
  ChatMessageReceivedEvent,
  CommunicationUserKind,
} from '@azure/communication-signaling';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { queryKeys } from 'app/api/chat';
import { ChatMessageType } from 'app/api/chat/constants';
import { Message, MessageFile } from 'app/api/chat/types';
import { dayjs } from 'app/utils';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { ThreadMessagesCache, ThreadsCache } from '../types';
import {
  insertAsLastMessage,
  removeMessageByClientId,
  getLatestSequenceId,
  updateOptimisticIDsForSorting,
} from '../utils';

import useChatEventEffect from './useChatEventEffect';

interface Metadata {
  files?: Array<MessageFile>;
  sender: {
    avatar: string;
    fullName: string;
    userId: number;
  };
}

// Live events return different casing than API
const getTypeCaseInsensitive = (type: string) => {
  switch (type.toLowerCase()) {
    case ChatMessageType.text.toLowerCase():
      return ChatMessageType.text;
    case ChatMessageType.html.toLowerCase():
      return ChatMessageType.html;
    case ChatMessageType.topicUpdated.toLowerCase():
      return ChatMessageType.topicUpdated;
    case ChatMessageType.participantAdded.toLowerCase():
      return ChatMessageType.participantAdded;
    case ChatMessageType.participantRemoved.toLowerCase():
      return ChatMessageType.participantRemoved;
    default:
      throw new Error(`Unkown message type: ${type}`);
  }
};

const formatNewMessage = (
  messageEvent: ChatMessageReceivedEvent,
  authenticatedUserId: number,
  nextSequenceId: number
): Message => {
  const metadata = JSON.parse(
    messageEvent.metadata.extendedProperties
  ) as Metadata;

  const reply = messageEvent.metadata.reply
    ? JSON.parse(messageEvent.metadata.reply)
    : undefined;

  const sender = messageEvent.sender as CommunicationUserKind;
  return {
    id: messageEvent.id,
    type: getTypeCaseInsensitive(messageEvent.type),
    version: messageEvent.version,
    createdOn: dayjs(messageEvent.createdOn).startOf('second').toISOString(),
    sender: {
      kind: 'communicationUser',
      userId: metadata.sender.userId,
      fullName: metadata.sender.fullName,
      avatar: metadata.sender.avatar,
      communicationUserId: sender.communicationUserId,
    },
    content: {
      message: messageEvent.message,
    },
    files: metadata.files,
    isMine: authenticatedUserId === metadata.sender.userId,
    sequenceId: String(nextSequenceId),
    reply,
  };
};

const useMessagesSocketEffect = (isNotificationsEnabled: boolean) => {
  const queryClient = useQueryClient();
  const { data: user } = useAuthenticatedUser();

  const messageListener = useCallback(
    async (event: ChatMessageReceivedEvent) => {
      if (!user) return undefined;
      // Update threads list to display unread indicator
      queryClient.setQueryData<ThreadsCache | undefined>(
        queryKeys.getThreads(),
        (cache) => {
          if (!cache) return undefined;
          return {
            ...cache,
            data: cache.data.map((thread) => {
              if (thread.id !== event.threadId) return thread;

              return {
                ...thread,
                lastMessageReceivedOn: event.createdOn.toISOString(),
              };
            }),
          };
        }
      );

      // Insert message into conversation
      queryClient.setQueryData<ThreadMessagesCache | undefined>(
        queryKeys.getMessages(event.threadId),
        (data) => {
          if (!data) return undefined;

          const maxSequenceId = getLatestSequenceId(data);
          const message = formatNewMessage(
            event,
            user.id,
            maxSequenceId ? Number(maxSequenceId) + 1 : 1
          );

          if (message.sender?.userId === user.id) {
            const reorderedCache = updateOptimisticIDsForSorting(
              data,
              event.metadata.clientId,
              event.id
            );

            const [purgedCache, removedMessage] = removeMessageByClientId(
              reorderedCache,
              event.metadata.clientId
            );

            return insertAsLastMessage(
              {
                ...message,
                // If message is already in cache
                // We want to preserve same position in UI
                sequenceId: removedMessage?.sequenceId || message.sequenceId,
                isResponseReceived: true,
              },
              purgedCache
            );
          }

          return insertAsLastMessage(message, data);
        }
      );

      return undefined;
    },
    [queryClient, user]
  );

  useChatEventEffect(
    {
      type: 'chatMessageReceived',
      listener: messageListener,
    },
    isNotificationsEnabled
  );
};

export default useMessagesSocketEffect;

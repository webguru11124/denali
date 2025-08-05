import { ChatMessageDeletedEvent } from '@azure/communication-signaling';
import { queryKeys } from 'app/api/chat';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { ThreadMessagesCache } from '../types';
import { markMessageAsDeletedInCache } from '../utils';

import useChatEventEffect from './useChatEventEffect';

const useChatMessageDeletedEffect = (isNotificationsEnabled: boolean) => {
  const queryClient = useQueryClient();
  const messageDeletedListener = useCallback(
    (event: ChatMessageDeletedEvent) => {
      const messagesQueryKey = queryKeys.getMessages(event.threadId);

      queryClient.setQueryData<ThreadMessagesCache | undefined>(
        messagesQueryKey,
        (cache) => {
          if (!cache) return undefined;

          return markMessageAsDeletedInCache(cache, event.id);
        }
      );
    },
    [queryClient]
  );

  useChatEventEffect(
    {
      type: 'chatMessageDeleted',
      listener: messageDeletedListener,
    },
    isNotificationsEnabled
  );
};

export default useChatMessageDeletedEffect;

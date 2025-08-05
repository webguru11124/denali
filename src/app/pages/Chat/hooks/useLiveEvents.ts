import { useChatClient } from 'app/context/ChatContext/hooks';
import { logger } from 'app/utils';
import { useEffect, useState } from 'react';

import useChatMessageDeletedEffect from './useChatMessageDeletedEffect';
import useMessagesSocketEffect from './useMessagesSocketEffect';
import useThreadRemovedSocketEffect from './useThreadRemovedSocketEffect';
import useThreadsSocketEffect from './useThreadsSocketEffect';

const useLiveEvents = () => {
  const chatClient = useChatClient();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useMessagesSocketEffect(isNotificationsEnabled);
  useThreadsSocketEffect(isNotificationsEnabled);
  useThreadRemovedSocketEffect(isNotificationsEnabled);
  useChatMessageDeletedEffect(isNotificationsEnabled);

  useEffect(() => {
    if (!chatClient) {
      return undefined;
    }
    chatClient
      .startRealtimeNotifications()
      .then(() => {
        setIsNotificationsEnabled(true);
      })
      .catch(logger.error);

    return () => {
      chatClient.stopRealtimeNotifications().then(() => {
        setIsNotificationsEnabled(false);
      });
    };
  }, [chatClient]);
};

export default useLiveEvents;

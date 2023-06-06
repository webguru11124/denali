import { queryKeys } from 'app/api/chat';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import useChatEventEffect from './useChatEventEffect';

const useThreadsSocketEffect = (isNotificationsEnabled: boolean) => {
  const queryClient = useQueryClient();

  const threadCreatedListener = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.getThreads());
  }, [queryClient]);

  useChatEventEffect(
    {
      type: 'chatThreadCreated',
      listener: threadCreatedListener,
    },
    isNotificationsEnabled
  );
};

export default useThreadsSocketEffect;

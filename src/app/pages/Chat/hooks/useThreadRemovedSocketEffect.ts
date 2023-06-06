import { queryKeys } from 'app/api/chat';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import useChatEventEffect from './useChatEventEffect';

const useThreadRemovedSocketEffect = (isNotificationsEnabled: boolean) => {
  const queryClient = useQueryClient();

  const threadRemovedListener = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.getThreads());
  }, [queryClient]);

  useChatEventEffect(
    {
      type: 'chatThreadDeleted',
      listener: threadRemovedListener,
    },
    isNotificationsEnabled
  );
};

export default useThreadRemovedSocketEffect;

import { useMemo } from 'react';

import useThreads from './useThreads';

const useUnreadThreadsAmount = () => {
  const { data: threads, ...restProps } = useThreads();
  const unreadThreadsAmount = useMemo(() => {
    if (!threads) return undefined;

    return threads.filter(({ hasUnreadMessages }) => hasUnreadMessages).length;
  }, [threads]);

  return {
    unreadThreadsAmount,
    ...restProps,
  };
};

export default useUnreadThreadsAmount;

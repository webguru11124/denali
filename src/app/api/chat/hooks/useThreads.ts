import { queryKeys, resources } from 'app/api/chat';
import { MappedListThread } from 'app/pages/Chat/types';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { ListThread } from '../types';

const getHasUnreadMessages = (
  thread: ListThread,
  currentlyOpenThreadId?: string
) => {
  if (thread.id === currentlyOpenThreadId || !thread.lastMessageReceivedOn)
    return false;
  if (!thread.lastMessageReadOn) return true;

  return (
    new Date(thread.lastMessageReadOn) <= new Date(thread.lastMessageReceivedOn)
  );
};

const useThreads = () => {
  const { id: openThreadId } = useParams<{ id?: string }>();
  const {
    data: threads,
    isLoading,
    isError,
    error,
  } = useQuery(queryKeys.getThreads(), resources.getThreads, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mappedThreads = useMemo<MappedListThread[]>(() => {
    if (threads?.data) {
      return threads?.data.map((thread) => ({
        ...thread,
        hasUnreadMessages: getHasUnreadMessages(thread, openThreadId),
      }));
    } else {
      return [];
    }
  }, [openThreadId, threads?.data]);

  return { data: mappedThreads, isLoading, isError, error };
};

export default useThreads;

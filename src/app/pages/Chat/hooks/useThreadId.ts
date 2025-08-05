import { useParams } from 'react-router-dom';

const useThreadId = () => {
  const { id: threadId } = useParams<{ id?: string }>();

  if (!threadId) throw new Error('[useThreadId]: no chat thread ID');

  return threadId;
};

export default useThreadId;

import { queryKeys, resources } from 'app/api/chat';
import { useQuery } from 'react-query';

const useThread = (id: string) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getThread(id),
    () => resources.getThread(id),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: data?.data, isLoading, isError };
};

export default useThread;

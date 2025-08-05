import { resources, queryKeys } from 'app/api/chat';
import { useQuery } from 'react-query';

interface Options {
  enabled?: boolean;
}

const useThreadParticipants = (id: string, options: Options = {}) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getThreadParticipants(id),
    () => resources.getThreadParticipants(id),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return { data: data?.data, isLoading, isError };
};

export default useThreadParticipants;

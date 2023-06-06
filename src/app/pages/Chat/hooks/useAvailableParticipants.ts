import { resources, queryKeys } from 'app/api/chat';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const LIMIT = 100;

const useAvailableParticipants = (query: string) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    queryKeys.getAvailableParticipants({
      query,
      limit: LIMIT,
    }),
    () => resources.getAvailableParticipants({ query, limit: LIMIT }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: selectData(data), isLoading, isFetching, isError };
};

export default useAvailableParticipants;

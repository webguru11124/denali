import { resources, queryKeys } from 'app/api/chat';
import { useQuery } from 'react-query';

// Token request should only be called from ChatTokenHandler
// request instance has to be configured before doing that
// hook can be used as state mechanism to retrieve chat token
const useChatTokenQuery = (isEnabled = false) => {
  const { data, isLoading, isError, refetch } = useQuery(
    queryKeys.getChatToken(),
    resources.getChatToken,
    {
      enabled: isEnabled,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: data?.data, isLoading, isError, refetch };
};

export default useChatTokenQuery;

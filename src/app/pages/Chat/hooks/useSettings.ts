import { queryKeys, resources } from 'app/api/chat';
import { useQuery } from 'react-query';

const useSettings = () => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getSettings(),
    resources.getSettings
  );

  return { data: data?.data, isLoading, isError };
};

export default useSettings;

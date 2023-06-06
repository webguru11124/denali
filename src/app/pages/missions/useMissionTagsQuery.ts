import { queryKeys, resources } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useMissionTagsQuery = () => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getTags(),
    resources.getTags,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useMissionTagsQuery;

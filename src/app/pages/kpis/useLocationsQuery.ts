import { queryKeys, resources } from 'app/api/kpis';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useLocationsQuery = () => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getLocations(),
    resources.getLocations,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useLocationsQuery;

import { resources, queryKeys } from 'app/api/kpis';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useDatesRanges = () => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getDatesRanges(),
    resources.getDatesRanges,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useDatesRanges;

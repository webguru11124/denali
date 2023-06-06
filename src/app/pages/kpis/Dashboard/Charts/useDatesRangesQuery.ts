import { resources, queryKeys } from 'app/api/kpis';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const DISABLED_DATES = ['today', 'yesterday'];

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

  return {
    data: selectData(data)?.filter(
      ({ slug }) => !DISABLED_DATES.includes(slug)
    ),
    isLoading,
    isError,
  };
};

export default useDatesRanges;

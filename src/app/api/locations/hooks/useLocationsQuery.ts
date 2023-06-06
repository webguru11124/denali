import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetLocationsQuery = () => {
  const { data, isLoading, error, isFetching, isPreviousData } = useQuery(
    queryKeys.locations(),
    () => resources.getLocations()
  );

  return {
    data: data?.data,
    isFetching,
    isLoading,
    isPreviousData,
    error,
  };
};

export default useGetLocationsQuery;

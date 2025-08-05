import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetSharingConnectionQuery = ({
  enabled = true,
  include,
}: {
  enabled?: boolean;
  include?: string;
}) => {
  const { data, isLoading, error, isFetching, isPreviousData, refetch } =
    useQuery(
      queryKeys.sharingConnection(),
      () => resources.getSharingConnection(include),
      { enabled }
    );

  return {
    data: data,
    isFetching,
    isLoading,
    isPreviousData,
    refetch,
    error,
  };
};

export default useGetSharingConnectionQuery;

import { NonNegativeNumber } from 'common-ui/utils/nonNegativeNumber';
import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetAudiencesQuery = ({
  page,
  query,
  enabled,
}: {
  page: number;
  query: string;
  enabled?: boolean;
}) => {
  const { data, isLoading, error, isFetching, isPreviousData, refetch } =
    useQuery(
      queryKeys.audiences(page, query),
      () => resources.getAudiences(NonNegativeNumber.create(page).value, query),
      { enabled }
    );

  return {
    data: data?.data?.data,
    meta: data?.data?.meta,
    isFetching,
    isLoading,
    isPreviousData,
    error,
    refetch,
  };
};

export default useGetAudiencesQuery;

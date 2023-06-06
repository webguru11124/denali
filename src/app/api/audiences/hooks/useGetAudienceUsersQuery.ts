import { NonNegativeNumber } from 'common-ui/utils/nonNegativeNumber';
import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetAudienceUsersQuery = ({
  id,
  page,
}: {
  id: number;
  page: number;
}) => {
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    queryKeys.audienceUsers(id, page),
    () => resources.getAudienceUsers(NonNegativeNumber.create(id).value, page)
  );

  return {
    data: data?.data?.data,
    meta: data?.data?.meta,
    isFetching,
    isLoading,
    error,
    refetch,
  };
};

export default useGetAudienceUsersQuery;

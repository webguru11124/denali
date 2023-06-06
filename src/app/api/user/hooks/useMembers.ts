import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';
import { GetMemberListRequest } from '../types';

const useGetMembersQuery = (
  params: GetMemberListRequest
) => {
  const { data, isLoading, error, isFetching, isPreviousData, refetch } =
    useQuery(
      queryKeys.members(params),
      () =>
        resources.getMembers(params)
    );

  return {
    data: data?.data?.data,
    meta: data?.data?.meta,
    isFetching,
    isLoading,
    isPreviousData,
    refetch,
    error,
  };
};

export default useGetMembersQuery;
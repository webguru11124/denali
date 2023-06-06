import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetUsersQuery = ({
  locations,
  professions,
}: {
  locations: number[];
  professions: number[];
}) => {
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    queryKeys.users(locations, professions),
    () => resources.getUsersFromLocationProfession(locations, professions),
    { enabled: locations.length > 0 }
  );

  return {
    data: data?.data?.data,
    isFetching,
    isLoading,
    error,
    refetch,
  };
};

export default useGetUsersQuery;

import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetProfessionsQuery = () => {
  const { data, isLoading, error, isFetching, isPreviousData } = useQuery(
    queryKeys.professions(),
    () => resources.getProfessions()
  );

  return {
    data: data?.data?.data,
    isFetching,
    isLoading,
    isPreviousData,
    error,
  };
};

export default useGetProfessionsQuery;

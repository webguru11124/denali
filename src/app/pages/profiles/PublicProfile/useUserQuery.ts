import { resources, queryKeys } from 'app/api/user';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useUserQuery = (id: number) => {
  const { data, isLoading, isError } = useQuery(queryKeys.getUser(id), () =>
    resources.getUser(id)
  );

  return { data: selectData(data), isLoading, isError };
};

export default useUserQuery;

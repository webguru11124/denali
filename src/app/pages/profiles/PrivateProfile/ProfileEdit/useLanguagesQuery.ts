import { resources, queryKeys } from 'app/api/internationalization';
import { useQuery } from 'react-query';

const useLanguagesQuery = () => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getLanguages(),
    resources.getLanguages,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data: data?.data?.data, isLoading, isError };
};

export default useLanguagesQuery;

import { resources, queryKeys } from 'app/api/tenancy';
import { useQuery } from 'react-query';

interface Options {
  enabled: boolean;
}

const useRedirectKey = ({ enabled }: Options) => {
  const { data, ...restQuery } = useQuery(
    queryKeys.getNikeSKURedirectKey(),
    resources.getNikeSKURedirectKey,
    {
      enabled,
    }
  );

  return {
    data: data?.data,
    ...restQuery,
  };
};

export default useRedirectKey;

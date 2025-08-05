import { queryKeys, resources } from 'app/api/tenancy';
import { useQuery } from 'react-query';

interface Options {
  redirectKey?: string;
  tenant?: string;
}

const useUserQuery = ({ redirectKey, tenant }: Options) => {
  const { data, ...restQuery } = useQuery(
    queryKeys.getNikeSKUUser(),
    () =>
      resources.getNikeSKUUser({
        redirectKey: String(redirectKey),
        tenant,
      }),
    {
      enabled: Boolean(redirectKey),
    }
  );

  return {
    data: data?.data?.data,
    ...restQuery,
  };
};

export default useUserQuery;

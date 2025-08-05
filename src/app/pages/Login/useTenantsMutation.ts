import { resources } from 'app/api/auth';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/auth';
import { useMutation } from 'react-query';

const useTenantsMutation = () => {
  const dispatch = useDispatch();
  const { mutate, isLoading, isError, mutateAsync } = useMutation(
    resources.getTenants,
    {
      onSuccess: (data) => {
        dispatch(
          actions.tenantsRetrieved(
            data.data.data.map(({ fqdn, tenant_logo: logo, name }) => ({
              url: `https://${fqdn}`,
              alias: name,
              logo,
            }))
          )
        );
      },
    }
  );

  return {
    getTenants: (email: string, onSuccess: () => void) =>
      mutate(email, {
        onSuccess,
      }),
    isLoading,
    isError,
    mutateAsync,
  };
};

export default useTenantsMutation;

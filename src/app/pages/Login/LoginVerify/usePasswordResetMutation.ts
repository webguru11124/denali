import { resources } from 'app/api/auth';
import { useMutation } from 'react-query';

const usePasswordResetMutation = () => {
  const { mutate, isLoading, isError } = useMutation(
    resources.requestPasswordReset
  );

  return {
    requestReset: (email: string) => mutate({ email }),
    isLoading,
    isError,
  };
};

export default usePasswordResetMutation;

import { resources } from 'app/api/auth';
import { useMutation } from 'react-query';

const useUpdatePasswordMutation = () => {
  const { mutate, isLoading, isError } = useMutation(
    resources.requestPasswordUpdate
  );

  return {
    update: mutate,
    isLoading,
    isError,
  };
};

export default useUpdatePasswordMutation;

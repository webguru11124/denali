import { resources } from 'app/api/auth';
import { useMutation } from 'react-query';

const useChangePasswordMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.changePassword
  );

  return { mutate, isLoading, isError, data };
};

export default useChangePasswordMutation;

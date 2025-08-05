import { resources } from 'app/api/auth';
import { useMutation } from 'react-query';

const useValidateEmailTokenMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.validateEmailToken
  );

  return { mutate, isLoading, isError, data: data?.data };
};

export default useValidateEmailTokenMutation;

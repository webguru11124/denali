import { resources } from 'app/api/sisenseDashboard';
import { useMutation } from 'react-query';

const useWebAccessTokenMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.getWebAccessToken
  );

  return { mutate, isLoading, isError, data };
};

export default useWebAccessTokenMutation;

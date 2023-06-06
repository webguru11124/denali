import { resources, types } from 'app/api/auth';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/auth';
import { logger } from 'app/utils';
import { isAxiosError } from 'axios';
import { useMutation } from 'react-query';

const useLoginMutation = () => {
  const dispatch = useDispatch();
  const { mutate, isLoading, isError, error } = useMutation(
    resources.getToken,
    {
      onSuccess: (data) => {
        const authToken = data?.data?.accessToken;

        if (authToken) {
          dispatch(actions.tokenRetrieved(authToken));
        } else {
          logger.warn(
            'Token response was successfull but token was not found',
            authToken
          );
        }
      },
      onError: (err) => {
        if (isAxiosError(err) && err?.response?.status === 401) {
          return;
        }

        logger.error(err);
      },
    }
  );
  return {
    login: (userData: types.LoginUserDataProps) => mutate(userData),
    isLoading,
    isError,
    error,
  };
};

export default useLoginMutation;

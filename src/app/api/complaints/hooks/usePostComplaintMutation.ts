import { queryKeys } from 'app/api/auth';
import { useMutation, useQueryClient } from 'react-query';

import { postComplaint } from '../resources';

const usePostComplaintMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: isCreating,
    isError,
    isSuccess,
    data,
  } = useMutation(postComplaint, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.authenticatedUser());
    },
  });

  return { mutate, isCreating, isError, isSuccess, data };
};

export default usePostComplaintMutation;

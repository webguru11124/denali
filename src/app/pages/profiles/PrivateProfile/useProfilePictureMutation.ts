import { resources, queryKeys } from 'app/api/auth';
import { useMutation, useQueryClient } from 'react-query';

const useProfilePicture = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    resources.requestProfilePictureUpdate,
    {
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.authenticatedUser());
      },
    }
  );

  return { upload: mutate, isLoading, isError };
};

export default useProfilePicture;

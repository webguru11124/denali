import { resources } from 'app/api/articleSharing';
import { useMutation } from 'react-query';

const useDeleteSharingConnectionMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.deleteSharingConnection
  );

  return { mutate, isLoading, isError, data };
};

export default useDeleteSharingConnectionMutation;

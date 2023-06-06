import { resources } from 'app/api/audiences';
import { useMutation } from 'react-query';

const useDeleteAudienceMutation = () => {
  const {
    mutate,
    isLoading: isDeleting,
    isError,
    data,
  } = useMutation(resources.deleteAudience);

  return { mutate, isDeleting, isError, data };
};

export default useDeleteAudienceMutation;

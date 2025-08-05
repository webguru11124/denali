import { resources } from 'app/api/audiences';
import { useMutation } from 'react-query';

const useUpdateAudienceMutation = () => {
  const {
    mutate,
    isLoading: isUpdating,
    isError,
    data,
  } = useMutation(resources.updateAudience);

  return { mutate, isUpdating, isError, data };
};

export default useUpdateAudienceMutation;

import { resources } from 'app/api/audiences';
import { useMutation } from 'react-query';

const useCreateAudienceMutation = () => {
  const {
    mutate,
    isLoading: isCreating,
    isError,
    data,
  } = useMutation(resources.createAudience);

  return { mutate, isCreating, isError, data };
};

export default useCreateAudienceMutation;

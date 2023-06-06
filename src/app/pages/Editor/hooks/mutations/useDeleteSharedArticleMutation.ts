import { resources } from 'app/api/articleSharing';
import { useMutation } from 'react-query';

const useDeleteSharedArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.deleteSharedArticle
  );

  return { mutate, isLoading, isError, data };
};

export default useDeleteSharedArticleMutation;

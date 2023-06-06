import { resources } from 'app/api/articles';
import { useMutation } from 'react-query';

const useDeleteArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.deleteArticle
  );

  return { mutate, isLoading, isError, data };
};

export default useDeleteArticleMutation;

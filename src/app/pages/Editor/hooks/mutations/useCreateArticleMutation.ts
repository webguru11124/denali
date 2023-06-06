import { resources } from 'app/api/articles';
import { useMutation } from 'react-query';

const useCreateArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.createArticle
  );

  return { mutate, isLoading, isError, data };
};

export default useCreateArticleMutation;

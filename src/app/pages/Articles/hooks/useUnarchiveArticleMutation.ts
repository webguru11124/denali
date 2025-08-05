import { resources } from 'app/api/articles';
import { useMutation } from 'react-query';

const useUArchiveArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.unArchiveArticle
  );

  return { mutate, isLoading, isError, data };
};

export default useUArchiveArticleMutation;

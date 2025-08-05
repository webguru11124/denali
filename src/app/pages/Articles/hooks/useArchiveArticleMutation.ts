import { resources } from 'app/api/articles';
import { useMutation } from 'react-query';

const useArchiveArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.archiveArticle
  );

  return { mutate, isLoading, isError, data };
};

export default useArchiveArticleMutation;

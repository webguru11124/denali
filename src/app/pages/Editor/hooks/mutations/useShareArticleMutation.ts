import { resources } from 'app/api/articleSharing';
import { useMutation } from 'react-query';

const useShareArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.shareArticle
  );

  return { mutate, isLoading, isError, data };
};

export default useShareArticleMutation;

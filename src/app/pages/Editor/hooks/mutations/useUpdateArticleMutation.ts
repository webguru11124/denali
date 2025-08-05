import { queryKeys, resources } from 'app/api/articles';
import queryClient from 'app/query';
import { useMutation } from 'react-query';

const useUpdateArticleMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.updateArticle,
    {
      onSettled: (res, error) => {
        if (!res) return;
        queryClient.invalidateQueries(queryKeys.article(res.id));
      },
    }
  );

  return { mutate, isLoading, isError, data };
};

export default useUpdateArticleMutation;

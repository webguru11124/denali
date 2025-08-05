import narrowUnknown from 'app/utils/narrowUnknown';
import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useArticle = ({ id, enabled }: { id: number; enabled: boolean }) => {
  const {
    data,
    isLoading,
    error: apiError,
  } = useQuery(queryKeys.article(id), () => resources.getArticle({ id }), {
    enabled,
    refetchOnWindowFocus: false,
  });

  return {
    article: data,
    isLoading,
    error: narrowUnknown(apiError),
    apiError,
  };
};

export { useArticle };
export default useArticle;

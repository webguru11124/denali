import { resources, queryKeys } from 'app/api/wiki';
import { useQuery } from 'react-query';

interface Options {
  enabled: boolean;
}

const defaultOptions = {
  enabled: true,
};

const useWikiArticle = (id: number, { enabled }: Options = defaultOptions) => {
  const { data, isLoading, error } = useQuery(
    queryKeys.getWikiArticle(id),
    () => resources.getWikiArticle(id),
    {
      enabled,
    }
  );

  return { data: data?.data?.data, isLoading, error };
};

export default useWikiArticle;

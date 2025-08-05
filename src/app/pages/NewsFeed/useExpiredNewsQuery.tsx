import { resources, queryKeys } from 'app/api/news';
import { reducePages } from 'app/utils';
import { useInfiniteQuery } from 'react-query';

interface Data {
  query: string;
  category: string;
  enabled: boolean;
}

const useExpiredNewsQuery = ({ query, category, enabled }: Data) => {
  const { data, fetchNextPage, isLoading, error, isFetching } =
    useInfiniteQuery(
      queryKeys.expired(query, category),
      ({ pageParam }) =>
        resources.getExpiredNews(pageParam || 1, 10, query, category),
      {
        enabled,
        getNextPageParam: (response) => response.data.meta.currentPage + 1,
      }
    );
  const reducedData = reducePages(data);

  return {
    data: reducedData?.data,
    meta: reducedData?.meta,
    isFetching,
    isLoading,
    fetchNext: fetchNextPage,
    error,
  };
};

export default useExpiredNewsQuery;

import { types, resources, queryKeys } from 'app/api/news';
import { reducePages } from 'app/utils';
import { useInfiniteQuery } from 'react-query';

const useNewsArticleQuery = (id: number) => {
  const { data, isLoading, error, isFetching, fetchNextPage } =
    useInfiniteQuery(
      queryKeys.articleComments(id),
      ({ pageParam }) =>
        resources.getNewsArticleComments(id, {
          perPage: 10,
          page: pageParam || 1,
        }),
      {
        getNextPageParam: (response) => response.data.meta.currentPage + 1,
      }
    );

  const reducedData = reducePages<types.Comment>(data);
  return {
    data: reducedData?.data,
    meta: reducedData?.meta,
    loadNextPage: fetchNextPage,
    isLoading,
    isFetching,
    error,
  };
};

export default useNewsArticleQuery;

import { PaginatedResponseMeta } from 'app/api/types';
import { resources, queryKeys } from 'app/api/wiki';
import { WikiArticleListItemProps } from 'app/api/wiki/types';
import last from 'lodash/last';
import { useInfiniteQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

const useWikiQuery = (query: string) => {
  const [debouncedQuery] = useDebounce(query, 500);
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery(
    queryKeys.wikiList(debouncedQuery),
    ({ pageParam }) =>
      resources.getWiki({
        perPage: 20,
        page: pageParam || 1,
        query,
      }),
    {
      getNextPageParam: (response) => Number(response.meta.currentPage) + 1,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const items: WikiArticleListItemProps[] | undefined = data?.pages
    .map((page) => page.data)
    .flat();
  const meta: PaginatedResponseMeta | undefined = last(data?.pages)?.meta;

  return {
    data: items,
    meta,
    fetchNext: fetchNextPage,
    isLoading,
    error,
  };
};

export default useWikiQuery;

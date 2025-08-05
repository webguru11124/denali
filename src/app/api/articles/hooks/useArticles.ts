import { ArticleFilter } from 'app/pages/Articles/context';
import { NonNegativeNumber } from 'common-ui/utils/nonNegativeNumber';
import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

const useGetArticlesQuery = ({
  filters,
  page,
  enabled,
}: {
  page: number;
  filters: ArticleFilter;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  keepPreviousData?: boolean;
}) => {
  const { data, isLoading, error, isFetching, isPreviousData, refetch } =
    useQuery(
      queryKeys.articles(NonNegativeNumber.create(page).value, filters),
      () =>
        resources.getArticles(NonNegativeNumber.create(page).value, filters),
      { enabled }
    );

  return {
    data: data?.data,
    meta: data?.meta,
    isFetching,
    isLoading,
    isPreviousData,
    refetch,
    error,
  };
};

export default useGetArticlesQuery;

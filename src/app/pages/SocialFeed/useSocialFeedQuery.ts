import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { resources, queryKeys } from 'app/api/socialFeed';
import { reducePages } from 'app/utils';
import { useInfiniteQuery } from 'react-query';

const useSocialFeedQuery = () => {
  const { data: user } = useAuthenticatedUser();
  if (!user) throw new Error('[useSocialFeedQuery]: no authenticated user');

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    queryKeys.getSocialFeed(user.contentLanguage.current.id),
    ({ pageParam }) =>
      resources.getSocialFeed({
        page: pageParam,
        languageId: user.contentLanguage.current.id,
      }),
    {
      getNextPageParam: (response) => response.data.meta.currentPage + 1,
    }
  );

  const reducedData = reducePages(data);
  return {
    data: reducedData?.data,
    meta: reducedData?.meta,
    fetchNextPage,
    isLoading,
    isError,
  };
};

export default useSocialFeedQuery;

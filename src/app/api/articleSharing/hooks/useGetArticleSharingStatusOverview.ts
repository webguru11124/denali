import { useQuery } from 'react-query';

import { resources, queryKeys } from '../index';

interface Props {
  articleId: number;
  enabled?: boolean;
}

const useGetArticleSharingStatusOverview = ({
  articleId,
  enabled = true,
}: Props) => {
  const { data, isLoading, error, isFetching, isPreviousData, refetch } =
    useQuery(
      queryKeys.sharingConnectionStatusOverview(articleId),
      () => resources.getArticleSharingStatusOverview(articleId),
      { enabled }
    );

  return {
    data: data,
    isFetching,
    isLoading,
    isPreviousData,
    refetch,
    error,
  };
};

export default useGetArticleSharingStatusOverview;

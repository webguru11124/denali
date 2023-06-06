import { resources, queryKeys } from 'app/api/auth';
import { useQuery } from 'react-query';

const useBadgesQuery = (userId: number) => {
  const { data, isLoading, isError } = useQuery(queryKeys.badges(userId), () =>
    resources.getBadges(userId)
  );

  return { data: data?.data?.data, isLoading, isError };
};

export default useBadgesQuery;

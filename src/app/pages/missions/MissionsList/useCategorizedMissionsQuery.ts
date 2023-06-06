import { resources, queryKeys } from 'app/api/missions';
import { constants } from 'app/router';
import { reducePages } from 'app/utils';
import { useInfiniteQuery } from 'react-query';

const CATEGORY_ACTIONS = {
  [constants.missionListTypes.active]: {
    resource: resources.getActiveMissions,
    queryKey: queryKeys.getActiveMissionsPaginated,
  },
  [constants.missionListTypes.completed]: {
    resource: resources.getCompletedMissions,
    queryKey: queryKeys.getCompletedMissionsPaginated,
  },
  [constants.missionListTypes.new]: {
    resource: resources.getNewMissions,
    queryKey: queryKeys.getNewMissionsPaginated,
  },
};

type Category = 'active' | 'new' | 'completed';

const useCategorizedMissionsQuery = (
  category: Category,
  tags: Array<string>
) => {
  const actions = CATEGORY_ACTIONS[category];

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    actions.queryKey(tags),
    ({ pageParam }) =>
      actions.resource({
        page: pageParam || 1,
        perPage: 20,
        tags,
        query: '',
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

export default useCategorizedMissionsQuery;

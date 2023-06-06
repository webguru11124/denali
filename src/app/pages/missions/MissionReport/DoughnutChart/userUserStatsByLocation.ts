import { resources, queryKeys } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useUserStatsByLocation = (missionId: number, locationId: number) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getUserStatsByLocation(missionId, locationId),
    () => resources.getUserStatsByLocation(missionId, locationId)
  );

  return { data: selectData(data), isLoading, isError };
};

export default useUserStatsByLocation;

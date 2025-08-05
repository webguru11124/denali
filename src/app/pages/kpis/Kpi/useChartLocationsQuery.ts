import { queryKeys, resources } from 'app/api/kpis';
import { GetChartLocationsRequest } from 'app/api/kpis/types';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useChartLocationsQuery = (requestData: GetChartLocationsRequest) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getKpisChartLocations(requestData),
    () => resources.getKpisChartLocations(requestData)
  );

  return { data: selectData(data), isLoading, isError };
};

export default useChartLocationsQuery;

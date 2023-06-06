import { resources, queryKeys } from 'app/api/visualGuides';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useVisualGuidesQuery = () => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getVisualGuides(),
    resources.getVisualGuides
  );

  return { data: selectData(data), isLoading, isError };
};

export default useVisualGuidesQuery;

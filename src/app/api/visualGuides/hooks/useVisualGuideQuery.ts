import { resources, queryKeys } from 'app/api/visualGuides';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

interface Options {
  enabled: boolean;
}

const defaultOptions = {
  enabled: true,
};

const useVisualGuidesQuery = (
  id: number,
  { enabled }: Options = defaultOptions
) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getVisualGuide(id),
    () => resources.getVisualGuide(id),
    {
      enabled,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useVisualGuidesQuery;

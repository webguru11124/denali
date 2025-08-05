import { queryKeys, resources } from 'app/api/articles';
import { useQuery } from 'react-query';

const useGetFile = (
  tenant: string,
  fileId: string,
  fileName: string,
  responseType?: 'redirect' | 'url'
) => {
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    queryKeys.file(fileId, fileName),
    () => resources.getFile({ tenant, fileId, fileName, responseType }),
    { enabled: false }
  );

  return {
    data,
    refetch,
    isLoading,
    error,
  };
};

export default useGetFile;

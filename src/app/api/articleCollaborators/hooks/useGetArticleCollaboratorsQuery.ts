import { useQuery } from 'react-query';

import { queryKeys } from '../index';
import getArticleCollaborators from '../resources/getArticleCollaborators';

const useGetArticleCollaboratorsQuery = ({
  role,
  permissions,
  enabled = true,
}: {
  role: string;
  permissions: string;
  enabled?: boolean;
}) => {
  const { data, isLoading, error, isFetching, refetch } = useQuery(
    queryKeys.collaborators(),
    () => getArticleCollaborators(role, permissions),
    { enabled }
  );

  return {
    data: data?.data?.data,
    isFetching,
    isLoading,
    error,
    refetch,
  };
};

export default useGetArticleCollaboratorsQuery;

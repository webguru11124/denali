import { useMutation } from 'react-query';

import { resources } from '../index';

const useArchiveMemberMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.archiveMember
  );

  return { mutate, isLoading, isError, data };
};

export default useArchiveMemberMutation;

import { useMutation } from 'react-query';

import { resources } from '../index';

const useAnonymizeMemberMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.anonymizeMember
  );

  return { mutate, isLoading, isError, data };
};

export default useAnonymizeMemberMutation;

import { useMutation } from 'react-query';

import { resources } from '../index';

const useDeleteMemberMutation = () => {
  const { mutate, isLoading, isError, data } = useMutation(
    resources.deleteMember
  );

  return { mutate, isLoading, isError, data };
};

export default useDeleteMemberMutation;

import { resources } from 'app/api/channels';
import { useMutation } from 'react-query';

const useDeleteChannelMutation = () => {
  const mutation = useMutation(resources.deleteChannel);

  return { ...mutation };
};

export default useDeleteChannelMutation;

import { resources } from 'app/api/channels';
import { useMutation } from 'react-query';

const useUpdateChannelMutation = () => {
  const mutation = useMutation(resources.updateChannel);

  return { ...mutation };
};

export default useUpdateChannelMutation;

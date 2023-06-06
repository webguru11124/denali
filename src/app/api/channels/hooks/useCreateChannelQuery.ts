import { resources } from 'app/api/channels';
import { useMutation } from 'react-query';

const useCreateChannelMutation = () => {
  const mutation = useMutation(resources.createChannel);

  return { ...mutation };
};

export default useCreateChannelMutation;

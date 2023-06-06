import { useMutation } from 'react-query';

import uploadFile from '../resources/uploadFile';

const useFileUploadMutation = () => {
  const mutation = useMutation(uploadFile);

  return mutation;
};

export default useFileUploadMutation;

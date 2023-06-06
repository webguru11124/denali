import { resources, types } from 'app/api/visualGuides';
import { useMutation } from 'react-query';

const useUploadFilesMutation = (id: number) => {
  const { mutate, isLoading, isError } = useMutation(
    (data: types.UploadFilesData) => resources.uploadFiles(id, data)
  );

  return { mutate, isLoading, isError };
};

export default useUploadFilesMutation;

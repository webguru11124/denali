import { request } from '../../request';
import { FileUploadResponse } from '../types';

interface Data {
  id: string;
  file: File;
}

const uploadFile = ({ id, file }: Data) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('id', id);

  return request().post<FileUploadResponse>('/api/v1/media/upload', formData);
};

export default uploadFile;

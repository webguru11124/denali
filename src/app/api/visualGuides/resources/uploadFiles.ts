import { request } from '../../request';
import { UploadFilesData } from '../types';

const uploadFiles = (id: number, { files }: UploadFilesData) =>
  request().post(`/api/v1/vm-guides/${id}/files`, {
    filesToAdd: JSON.stringify(files),
  });

export default uploadFiles;

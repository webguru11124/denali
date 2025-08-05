import { nanoid } from 'nanoid';

import { FileWithMetadata } from '../types';

interface Data {
  file?: File;
  isUploaded: boolean;
  id?: number;
  src: string;
}

type CreateFilesWithMetadata = (data: Array<Data>) => Array<FileWithMetadata>;

const createFilesWithMetadata: CreateFilesWithMetadata = (files) =>
  files.map(({ file, src, isUploaded, id }) => ({
    file,
    id: id?.toString() || nanoid(),
    isUploaded,
    src,
  }));

export default createFilesWithMetadata;

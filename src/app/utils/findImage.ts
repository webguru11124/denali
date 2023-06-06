import { ApiFile } from 'app/api/types';

const findImage = (files: Array<ApiFile> | null) =>
  files?.find(({ type }) => type === 'image');

export default findImage;

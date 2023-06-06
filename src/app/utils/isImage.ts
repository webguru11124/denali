import { ApiFile, ApiImage } from 'app/api/types';

const isImage = (file: File | ApiFile): file is ApiImage =>
  file.type.includes('image');

export default isImage;

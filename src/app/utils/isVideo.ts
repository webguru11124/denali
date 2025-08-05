import { ApiFile, ApiVideo } from 'app/api/types';

const isVideo = (file: File | ApiFile): file is ApiVideo =>
  file.type.includes('video');

export default isVideo;

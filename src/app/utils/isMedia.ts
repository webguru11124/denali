import { ApiFile, ApiVideo, ApiImage } from 'app/api/types';

import isImage from './isImage';
import isVideo from './isVideo';

const isMedia = (file: File | ApiFile): file is ApiVideo | ApiImage =>
  isImage(file) || isVideo(file);

export default isMedia;

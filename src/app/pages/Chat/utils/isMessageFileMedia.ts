import { MessageFile } from 'app/api/chat/types';

import isMessageFileImage from './isMessageFileImage';

const isMessageFileMedia = (file: MessageFile) =>
  isMessageFileImage(file) || file.mimeType.includes('video');

export default isMessageFileMedia;

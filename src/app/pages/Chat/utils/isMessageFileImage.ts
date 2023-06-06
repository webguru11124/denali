import { MessageFile } from 'app/api/chat/types';

const isMessageFileImage = (file: MessageFile) =>
  file.mimeType.includes('image');

export default isMessageFileImage;

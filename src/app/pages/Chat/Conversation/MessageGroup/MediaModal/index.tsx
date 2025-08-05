import { MessageFile } from 'app/api/chat/types';
import { MediaModal as MediaModalComponent } from 'app/components';
import { FC } from 'react';

import { createAssetUrl } from '../../../utils';

interface MediaModalProps {
  onClose: () => void;
  file: MessageFile;
  totalFiles: number;
  currentFile: number;
  onNext: () => void;
  onPrev: () => void;
}

const MediaModal: FC<MediaModalProps> = ({ file, ...restProps }) => {
  const mediaUrl = createAssetUrl(file.relativeUrl);
  return (
    <MediaModalComponent
      {...restProps}
      file={{ type: file.mimeType, name: file.name, url: mediaUrl }}
    />
  );
};

export default MediaModal;

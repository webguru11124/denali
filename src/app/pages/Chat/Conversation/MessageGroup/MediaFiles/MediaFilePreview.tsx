import { MessageFile } from 'app/api/chat/types';
import { FC } from 'react';

import { createAssetUrl, isMessageFileImage } from '../../../utils';

import VideoPlayerThumbnail from './VideoPlayerThumbnail';

interface MediaFilePreviewProps {
  file: MessageFile;
  className?: string;
  height?: string;
  width?: string;
}

const MediaFilePreview: FC<MediaFilePreviewProps> = ({
  file,
  className,
  height,
  width,
}) => {
  const fileSource = createAssetUrl(file.relativeUrl);
  if (isMessageFileImage(file)) {
    return (
      <img
        width={width}
        height={height}
        className={className}
        src={fileSource}
        alt={file.name}
      />
    );
  }

  return (
    <VideoPlayerThumbnail
      className={className}
      width={String(width)}
      height={String(height)}
      src={fileSource}
    />
  );
};

export default MediaFilePreview;

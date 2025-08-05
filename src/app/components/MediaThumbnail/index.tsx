import { FileType } from 'app/api/types';
import { useMediaThumbnail } from 'app/hooks';
import { FC } from 'react';

interface MediaThumbnailProps {
  url: string;
  alt: string;
  type: FileType.image | FileType.video;
  className?: string;
}

const MediaThumbnail: FC<MediaThumbnailProps> = ({
  url,
  className,
  type,
  alt,
}) => {
  const { url: thumbUrl } = useMediaThumbnail(url, type);
  if (!thumbUrl) return null;
  return <img src={thumbUrl} alt={alt} className={className} />;
};

export default MediaThumbnail;

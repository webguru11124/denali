import { cx } from '@emotion/css';
import { generateVideoThumbnail } from 'app/utils';
import { FC, useEffect, useState } from 'react';
import PlayIcon from 'remixicon-react/PlayFillIcon';

import { UploadButtonControlsProps } from './types';
import UploadedImage from './UploadedImage';

interface UploadedVideoProps extends UploadButtonControlsProps {
  url: string;
  className?: string;
}

const PlayButton: FC = () => (
  <div className="rounded-full bg-grayscale-secondary opacity-80 p-2">
    <PlayIcon className="text-white w-6 h-6" />
  </div>
);

const UploadedVideo: FC<UploadedVideoProps> = ({
  url,
  onDeleteClick,
  onAddMoreClick,
  className,
}) => {
  const [thumbSource, setThumbSource] = useState<string | undefined>();

  useEffect(() => {
    if (url && !thumbSource) {
      generateVideoThumbnail(url).then((source) => {
        setThumbSource(source);
      });
    }
  }, [url, thumbSource]);
  if (!thumbSource) {
    return null;
  }

  return (
    <div className={cx('relative overflow-hidden', className)}>
      <UploadedImage
        onDeleteClick={onDeleteClick}
        onAddMoreClick={onAddMoreClick}
        url={thumbSource}
      />
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <PlayButton />
      </div>
    </div>
  );
};

export default UploadedVideo;

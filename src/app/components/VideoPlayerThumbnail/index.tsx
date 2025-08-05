import { cx } from '@emotion/css';
import { FC } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerThumbnailProps {
  src: string;
  height?: string;
  width?: string;
  className?: string;
}

const VideoPlayerThumbnail: FC<VideoPlayerThumbnailProps> = ({
  src,
  height,
  width,
  className,
}) => (
  <div className={cx('bg-gray-light relative', className)}>
    <ReactPlayer
      className="w-full h-full object-cover"
      height={height}
      width={width}
      url={src}
      playing={false}
      controls={false}
    />
  </div>
);

export default VideoPlayerThumbnail;

import { cx } from '@emotion/css';
import videoIcon from 'assets/icons/video.png';
import { FC } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerThumbnailProps {
  src: string;
  height: string;
  width: string;
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
    <div className="absolute bottom-0 right-0 mr-2 mb-1">
      <img src={videoIcon} alt="video" />
    </div>
  </div>
);

export default VideoPlayerThumbnail;

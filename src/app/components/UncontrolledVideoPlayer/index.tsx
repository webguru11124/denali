import { FC, useState } from 'react';
import { ReactPlayerProps } from 'react-player';

import VideoPlayer from '../VideoPlayer';

const UncontrolledVideoPlayer: FC<ReactPlayerProps> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <VideoPlayer
      {...props}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      playing={isPlaying}
    />
  );
};

export default UncontrolledVideoPlayer;

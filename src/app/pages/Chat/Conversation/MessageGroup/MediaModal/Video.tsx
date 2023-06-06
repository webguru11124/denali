import { FC } from 'react';
import ReactPlayer from 'react-player';

interface VideoProps {
  url: string;
}

const Video: FC<VideoProps> = ({ url }) => <ReactPlayer url={url} controls />;

export default Video;

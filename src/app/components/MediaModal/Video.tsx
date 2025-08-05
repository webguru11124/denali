/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import ReactPlayer from 'react-player';

interface VideoProps {
  url: string;
}

const Video: FC<VideoProps> = ({ url }) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <ReactPlayer className="my-auto" playing url={url} controls />
  </div>
);

export default Video;

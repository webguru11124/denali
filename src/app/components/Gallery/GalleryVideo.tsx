import styled from '@emotion/styled';
import { VideoPlayer } from 'app/components';
import { FC } from 'react';
import SeenIcon from 'remixicon-react/CheckDoubleLineIcon';
import NotSeenIcon from 'remixicon-react/EyeCloseLineIcon';

interface GalleryVideoProps {
  url: string;
  isSeen?: boolean;
  displayInspectedIndicator?: boolean;
  onVideoViewed: () => void;
}

interface SeenIndicatorProps {
  isSeen: boolean;
}

const videoHeight = 210;

const Container = styled.div`
  height: ${videoHeight}px;
`;

const SeenIndicator: FC<SeenIndicatorProps> = ({ isSeen }) => {
  const Icon = isSeen ? SeenIcon : NotSeenIcon;

  return (
    <span className="text-white flex items-center text-xs">
      <Icon className="mr-1" /> {isSeen ? 'Seen' : 'Not Seen'}
    </span>
  );
};

const GalleryVideo: FC<GalleryVideoProps> = ({
  url,
  isSeen,
  displayInspectedIndicator,
  onVideoViewed,
}) => (
  <Container className="w-full relative flex items-center justify-center rounded-lg overflow-hidden">
    <VideoPlayer
      onPause={() => null}
      className="max-h-full"
      onPlay={() => null}
      height={videoHeight}
      url={url}
      playing={false}
      onEnded={onVideoViewed}
      controls={false}
    />
    <div className="absolute bottom-0 left-0 flex items-center mb-2 ml-2">
      {displayInspectedIndicator && <SeenIndicator isSeen={Boolean(isSeen)} />}
    </div>
  </Container>
);

export default GalleryVideo;

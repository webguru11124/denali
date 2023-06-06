import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { RemixiconReactIconComponentType } from 'remixicon-react';
import PauseIcon from 'remixicon-react/PauseFillIcon';
import PlayIcon from 'remixicon-react/PlayFillIcon';

interface VideoPlayerProps extends ReactPlayerProps {
  onPlay: () => void;
  onPause: () => void;
}

interface ControlButtonProps {
  Icon: RemixiconReactIconComponentType;
  onClick: () => void;
  className?: string;
}

const Container = styled.div`
  video {
    width: 100%;
    height: 100%;
  }

  .pause {
    display: none;
  }

  :hover {
    .pause {
      display: block;
    }
  }
`;

const ControlButton: FC<ControlButtonProps> = ({
  Icon,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    type="button"
    className={cx(
      'rounded-full p-2 bg-grayscale-secondary opacity-80',
      className
    )}
  >
    <Icon className="w-10 h-10 text-white" />
  </button>
);

const VideoPlayer: FC<VideoPlayerProps> = ({
  playing,
  props,
  onPlay,
  onPause,
  height = '460px',
  width = '100%',
  controls = true,
  ...restProps
}) => (
  <Container className="relative w-full">
    <ReactPlayer
      height={height}
      width={width}
      playing={playing}
      onPause={onPause}
      onPlay={onPlay}
      controls={controls}
      {...restProps}
    />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {playing ? (
        <ControlButton className="pause" Icon={PauseIcon} onClick={onPause} />
      ) : (
        <ControlButton Icon={PlayIcon} onClick={onPlay} />
      )}
    </div>
  </Container>
);

export default VideoPlayer;

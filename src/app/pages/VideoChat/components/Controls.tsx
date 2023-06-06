import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';
import VideoOnIcon from 'remixicon-react/CameraFillIcon';
import VideoOffIcon from 'remixicon-react/CameraOffFillIcon';
import MicOnIcon from 'remixicon-react/MicFillIcon';
import MicOffIcon from 'remixicon-react/MicOffFillIcon';
import PhoneIcon from 'remixicon-react/PhoneFillIcon';
import { useThrottledCallback } from 'use-debounce';

import useControls from '../hooks/useControls';

const Container = styled.div`
  bottom: 33px;
  background-color: rgba(0, 0, 0, 0.24);
`;

const Button = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

const Controls: FC = () => {
  const {
    onHangUp,
    onVideoToggle,
    onMicToggle,
    isVideoOn,
    isMicOn,
    isVideoDisabled,
  } = useControls();

  const throttleOnMicToggle = useThrottledCallback(onMicToggle, 1000, {
    leading: true,
  });

  const throttleOnVideoToggle = useThrottledCallback(onVideoToggle, 1000, {
    leading: true,
  });

  return (
    <Container className="transform -translate-x-1/2 absolute inline-flex items-center justify-center rounded-xl left-1/2">
      <Button
        onClick={onHangUp}
        type="button"
        className="bg-error flex items-center justify-center m-4"
      >
        <PhoneIcon className="text-white w-6 h-6 transform rotate-134" />
      </Button>
      <Button
        disabled={isVideoDisabled}
        onClick={throttleOnVideoToggle}
        type="button"
        className={cx('flex items-center justify-center m-4 bg-white', {
          'bg-opacity-25': !isVideoOn,
        })}
      >
        {isVideoOn && (
          <VideoOnIcon className="w-5 h-5 text-grayscale-secondary" />
        )}
        {!isVideoOn && <VideoOffIcon className="w-5 h-5 text-white" />}
      </Button>
      <Button
        onClick={throttleOnMicToggle}
        type="button"
        className={cx('flex items-center justify-center m-4 bg-white', {
          'bg-opacity-25': !isMicOn,
        })}
      >
        {isMicOn && <MicOnIcon className="w-5 h-5 text-grayscale-secondary" />}
        {!isMicOn && <MicOffIcon className="w-5 h-5 text-white" />}
      </Button>
    </Container>
  );
};

export default Controls;

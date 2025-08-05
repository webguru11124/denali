import {
  LocalVideoStream,
  VideoStreamRenderer,
} from '@azure/communication-calling';
import { useContext } from 'react';

import CallContext from '../contexts/call';

const useLocalVideoStream = () => {
  const {
    videoDeviceInfo,
    localVideoStreamChanged,
    isVideoOnChanged,
    localStreamRendererChanged,
  } = useContext(CallContext);

  const createLocalStreamVideo = () => {
    if (videoDeviceInfo) {
      const stream = new LocalVideoStream(videoDeviceInfo);
      const localStreamRenderer = new VideoStreamRenderer(stream);
      const videoOptions = stream ? { localVideoStreams: [stream] } : undefined;

      localStreamRendererChanged(localStreamRenderer);
      localVideoStreamChanged(stream);

      isVideoOnChanged(true);
      return videoOptions;
    }

    isVideoOnChanged(false);
    return undefined;
  };

  return { createLocalStreamVideo };
};

export default useLocalVideoStream;

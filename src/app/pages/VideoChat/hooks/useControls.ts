import { VideoStreamRenderer } from '@azure/communication-calling';
import { useContext } from 'react';

import CallContext from '../contexts/call';

const useControls = () => {
  const {
    localVideoStream,
    isVideoOnChanged,
    videoDeviceInfo,
    localStreamRenderer,
    localStreamRendererChanged,
    call,
    isVideoOn,
    isMicOn,
  } = useContext(CallContext);

  const onHangUp = async () => {
    if (!call) return;
    await call.hangUp();
  };

  const onMicToggle = async () => {
    if (!call) return;
    if (call.isMuted) await call.unmute();
    else await call.mute();
  };

  const onVideoToggle = async () => {
    if (!videoDeviceInfo || !call || !localVideoStream) return;

    if (isVideoOn) {
      await call.stopVideo(localVideoStream);
      if (localStreamRenderer) localStreamRenderer.dispose();
      localStreamRendererChanged(null);
      isVideoOnChanged(false);
    } else {
      const renderer = new VideoStreamRenderer(localVideoStream);
      await call.startVideo(localVideoStream);
      localStreamRendererChanged(renderer);
      isVideoOnChanged(true);
    }
  };

  return {
    onVideoToggle,
    onMicToggle,
    onHangUp,
    isVideoOn,
    isMicOn,
    isVideoDisabled: !localVideoStream,
  };
};

export default useControls;

import {
  AudioDeviceInfo,
  Call,
  CallAgent,
  CallClient,
  CallState,
  DeviceManager,
  IncomingCall,
  LocalVideoStream,
  RemoteParticipant,
  VideoDeviceInfo,
  VideoStreamRenderer,
} from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { useSelector } from 'app/hooks';
import { useVideoChatTranslations } from 'app/internationalization/hooks';
import { selectors } from 'app/store/chat';
import { detect } from 'detect-browser';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CallModal from '../components/CallModal';
import IncomingCallModal from '../components/IncomingCallModal';
import CallContext, { CallContextValue } from '../contexts/call';
import getDominantParticipants from '../utils/getDominantParticipants';
import isOffline from '../utils/isOffline';

interface Props {
  children: ReactNode;
}
const CallProvider = ({ children }: Props) => {
  const { data: profile } = useAuthenticatedUser();
  const cachedChatToken = useSelector(selectors.getChatToken);

  const { t } = useVideoChatTranslations();
  const browser = detect();
  const isFirefox = browser && browser.name === 'firefox';

  const [callClient, setCallClient] = useState<CallClient | null>(null);
  const [callAgent, setCallAgent] = useState<CallAgent | null>(null);
  const [deviceManager, setDeviceManager] = useState<DeviceManager | null>(
    null
  );
  const [groupName, setGroupName] = useState<string | null>(null);
  const [callStartTimestamp, setCallStartTimestamp] = useState<number | null>(
    null
  );
  const [call, setCall] = useState<Call | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [callState, setCallState] = useState<CallState>('None');
  const [participants, setParticipants] = useState<
    ReadonlyArray<RemoteParticipant>
  >([]);
  const [dominantParticipants, setDominantParticipants] = useState<
    ReadonlyArray<RemoteParticipant>
  >([]);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
  const [localVideoStream, setLocalVideoStream] =
    useState<LocalVideoStream | null>(null);
  const [audioDeviceInfo, setAudioDeviceInfo] =
    useState<AudioDeviceInfo | null>(null);
  const [videoDeviceInfo, setVideoDeviceInfo] =
    useState<VideoDeviceInfo | null>(null);
  const [localStreamRenderer, setLocalStreamRenderer] =
    useState<VideoStreamRenderer | null>(null);
  const [isGroup, setIsGroup] = useState<boolean | null>(null);

  const handleIncomingCall = useCallback(
    async (event: { incomingCall: IncomingCall }) => {
      setIncomingCall(event.incomingCall);
    },
    [setIncomingCall]
  );

  const updateAudioDevices = useCallback(async () => {
    if (!deviceManager) return;
    const microphones = await deviceManager.getMicrophones();
    const speakers = await deviceManager.getSpeakers();
    setAudioDeviceInfo(microphones[0]);
    await deviceManager.selectMicrophone(microphones[0]);
    await deviceManager.selectSpeaker(speakers[0]);
  }, [deviceManager]);

  const updateVideoDevices = useCallback(async () => {
    if (!deviceManager) return;
    const videoDevices = await deviceManager.getCameras();
    setVideoDeviceInfo(videoDevices[0]);
  }, [deviceManager]);

  const initCallClient = useCallback(async () => {
    if (
      !cachedChatToken ||
      isFirefox ||
      callClient ||
      !profile?.name ||
      callAgent
    ) {
      return undefined;
    }

    const client = new CallClient();
    const manager = await client.getDeviceManager();

    const tokenCredential = new AzureCommunicationTokenCredential(
      cachedChatToken
    );
    const options = { displayName: profile.name };
    const agent = await client.createCallAgent(tokenCredential, options);

    setCallClient(client);
    setDeviceManager(manager);
    setCallAgent(agent);

    const videoDevices = await manager.getCameras();
    setVideoDeviceInfo(videoDevices[0] ?? null);

    const audioDevices = await manager.getMicrophones();
    setAudioDeviceInfo(audioDevices[0] ?? null);

    return () => {
      agent.dispose();
    };
  }, [callClient, callAgent, cachedChatToken, profile?.name, isFirefox]);

  const listenToEvents = useCallback(() => {
    if (!deviceManager || !callAgent) {
      return undefined;
    }

    deviceManager.on('videoDevicesUpdated', updateVideoDevices);
    deviceManager.on('audioDevicesUpdated', updateAudioDevices);
    callAgent.on('incomingCall', handleIncomingCall);

    return async () => {
      deviceManager.off('videoDevicesUpdated', updateVideoDevices);
      deviceManager.off('audioDevicesUpdated', updateAudioDevices);
      callAgent.off('incomingCall', handleIncomingCall);
    };
  }, [
    handleIncomingCall,
    updateVideoDevices,
    updateAudioDevices,
    callAgent,
    deviceManager,
  ]);

  const handleCallEnd = useCallback(() => {
    setLocalStreamRenderer(null);
    setCall(null);
    setGroupName(null);
    setCallState('None');
    setLocalVideoStream(null);
    setParticipants([]);
    setDominantParticipants([]);
    setCallStartTimestamp(null);
    setIncomingCall(null);
    setIsGroup(null);
  }, []);

  const handleStateChange = useCallback(() => {
    if (!call) return;
    setCallState(call.state);

    if (
      call.callEndReason &&
      isOffline(call.callEndReason) &&
      call.direction === 'Outgoing'
    ) {
      if (!isGroup) {
        toast.error(
          t('{{fullName}} is not online at this moment', {
            fullName: groupName,
          })
        );
      } else {
        toast.error(
          t('Nobody in {{groupName}} is online at this moment', {
            groupName,
          })
        );
      }
    }

    if (call.state === 'Connected') {
      setCallStartTimestamp(Date.now());
    }
    if (call.state === 'Disconnected') {
      if (localStreamRenderer) localStreamRenderer.dispose();
      handleCallEnd();
    }
  }, [
    groupName,
    isGroup,
    t,
    call,
    setCallState,
    setCallStartTimestamp,
    handleCallEnd,
    localStreamRenderer,
  ]);

  const handleIsMutedChange = useCallback(() => {
    if (!call) return;
    setIsMicOn(!call.isMuted);
  }, [call, setIsMicOn]);

  const handleLocalVideoStreamsUpdate = useCallback(() => {
    if (!call) return;
    setIsVideoOn(call.localVideoStreams.length > 0);
  }, [call, setIsVideoOn]);

  const handleParticipantsUpdate = useCallback(() => {
    if (!call) return;
    setParticipants(call.remoteParticipants);
    setDominantParticipants(getDominantParticipants(call.remoteParticipants));
  }, [call]);

  useEffect(() => {
    initCallClient();
  }, [initCallClient]);

  useEffect(() => {
    listenToEvents();
  }, [listenToEvents]);

  useEffect(() => {
    if (!incomingCall) return undefined;
    incomingCall.on('callEnded', handleCallEnd);
    return () => incomingCall.off('callEnded', handleCallEnd);
  }, [incomingCall, handleCallEnd]);

  useEffect(() => {
    if (!call) return undefined;
    call.on('stateChanged', handleStateChange);
    call.on('isMutedChanged', handleIsMutedChange);
    call.on('localVideoStreamsUpdated', handleLocalVideoStreamsUpdate);
    call.on('remoteParticipantsUpdated', handleParticipantsUpdate);

    return () => {
      call.off('isMutedChanged', handleIsMutedChange);
      call.off('localVideoStreamsUpdated', handleLocalVideoStreamsUpdate);
      call.off('stateChanged', handleStateChange);
      call.off('remoteParticipantsUpdated', handleParticipantsUpdate);
    };
  }, [
    call,
    handleIsMutedChange,
    handleLocalVideoStreamsUpdate,
    handleStateChange,
    handleParticipantsUpdate,
  ]);

  const value: CallContextValue = {
    callClient,
    callAgent,
    deviceManager,
    groupName,
    groupNameChanged: setGroupName,
    callStartTimestamp,
    callStartTimestampChanged: setCallStartTimestamp,
    call,
    callChanged: setCall,
    incomingCall,
    incomingCallChanged: setIncomingCall,
    callState,
    callStateChanged: setCallState,
    participants,
    participantsChanged: setParticipants,
    dominantParticipants,
    dominantParticipantsChanged: setDominantParticipants,
    isMicOn,
    isMicOnChanged: setIsMicOn,
    isVideoOn,
    isVideoOnChanged: setIsVideoOn,
    localVideoStream,
    localVideoStreamChanged: setLocalVideoStream,
    audioDeviceInfo,
    videoDeviceInfo,
    localStreamRenderer,
    localStreamRendererChanged: setLocalStreamRenderer,
    isGroup,
    isGroupChanged: setIsGroup,
  };

  return (
    <CallContext.Provider value={value}>
      {!!incomingCall && <IncomingCallModal />}
      {!!call && <CallModal />}
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;

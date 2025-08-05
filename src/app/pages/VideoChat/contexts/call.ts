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
import { createContext } from 'react';

export interface CallContextValue {
  callClient: CallClient | null;
  callAgent: CallAgent | null;
  deviceManager: DeviceManager | null;
  groupName: string | null;
  groupNameChanged: (groupName: string | null) => void;
  callStartTimestamp: number | null;
  callStartTimestampChanged: (timestamp: number | null) => void;
  call: Call | null;
  callChanged: (call: Call | null) => void;
  incomingCall: IncomingCall | null;
  incomingCallChanged: (incomingCall: IncomingCall | null) => void;
  callState: CallState;
  callStateChanged: (callState: CallState) => void;
  participants: ReadonlyArray<RemoteParticipant>;
  participantsChanged: (participants: ReadonlyArray<RemoteParticipant>) => void;
  dominantParticipants: ReadonlyArray<RemoteParticipant>;
  dominantParticipantsChanged: (
    participants: ReadonlyArray<RemoteParticipant>
  ) => void;
  isMicOn: boolean;
  isMicOnChanged: (isMicOn: boolean) => void;
  isVideoOn: boolean;
  isVideoOnChanged: (isVideoOn: boolean) => void;
  localVideoStream: LocalVideoStream | null;
  localVideoStreamChanged: (localVideoStream: LocalVideoStream | null) => void;
  audioDeviceInfo: AudioDeviceInfo | null;
  videoDeviceInfo: VideoDeviceInfo | null;
  localStreamRenderer: VideoStreamRenderer | null;
  localStreamRendererChanged: (
    streamRenderer: VideoStreamRenderer | null
  ) => void;
  isGroup: boolean | null;
  isGroupChanged: (isGroup: boolean | null) => void;
}

const CallContext = createContext<CallContextValue>({
  callClient: null,
  callAgent: null,
  deviceManager: null,
  groupName: null,
  groupNameChanged: () => {},
  callStartTimestamp: null,
  callStartTimestampChanged: () => {},
  call: null,
  callChanged: () => {},
  incomingCall: null,
  incomingCallChanged: () => {},
  callState: 'None',
  callStateChanged: () => {},
  participants: [],
  participantsChanged: () => {},
  dominantParticipants: [],
  dominantParticipantsChanged: () => {},
  isMicOn: false,
  isMicOnChanged: () => {},
  isVideoOn: false,
  isVideoOnChanged: () => {},
  localVideoStream: null,
  localVideoStreamChanged: () => {},
  audioDeviceInfo: null,
  videoDeviceInfo: null,
  localStreamRenderer: null,
  localStreamRendererChanged: () => {},
  isGroup: null,
  isGroupChanged: () => {},
});

export default CallContext;

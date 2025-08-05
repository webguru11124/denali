import { RemoteParticipant } from '@azure/communication-calling';

const participantPriority = (
  a: RemoteParticipant,
  b: RemoteParticipant
): number => {
  if (a.isSpeaking === b.isSpeaking) return a.isMuted ? 1 : -1;
  return a.isSpeaking ? -1 : 1;
};

export default participantPriority;

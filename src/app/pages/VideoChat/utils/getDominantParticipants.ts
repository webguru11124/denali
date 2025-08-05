import { RemoteParticipant } from '@azure/communication-calling';

import participantPriority from './participantPriority';

const getDominantParticipants = (
  participants: ReadonlyArray<RemoteParticipant>
): Array<RemoteParticipant> => {
  const dominantParticipants = [...participants].sort(participantPriority);
  return dominantParticipants.slice(0, 4);
};

export default getDominantParticipants;

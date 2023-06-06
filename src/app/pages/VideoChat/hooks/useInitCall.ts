import { Call } from '@azure/communication-calling';
import { useContext } from 'react';

import CallContext from '../contexts/call';
import getDominantParticipants from '../utils/getDominantParticipants';

const useInitCall = () => {
  const {
    callChanged,
    isMicOnChanged,
    participantsChanged,
    dominantParticipantsChanged,
  } = useContext(CallContext);

  const initCall = (call: Call) => {
    callChanged(call);
    isMicOnChanged(!call.isMuted);
    participantsChanged(call.remoteParticipants);
    dominantParticipantsChanged(
      getDominantParticipants(call.remoteParticipants)
    );
  };

  return { initCall };
};

export default useInitCall;

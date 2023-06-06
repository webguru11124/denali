import { request } from '../request';

interface RemoveParticipantRequest {
  threadId: string;
  participantId: string | number;
}

const removeParticipant = ({
  threadId,
  participantId,
}: RemoveParticipantRequest) =>
  request().delete(`/api/thread/${threadId}/participant/${participantId}`);

export default removeParticipant;

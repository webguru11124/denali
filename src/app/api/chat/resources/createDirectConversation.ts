import { request } from '../request';

interface CreateDirectConversationRequest {
  participantId: number;
}

const createDirectConversation = ({
  participantId,
}: CreateDirectConversationRequest) =>
  request().post('/api/thread', {
    type: 'direct',
    participantsIds: [participantId],
  });

export default createDirectConversation;

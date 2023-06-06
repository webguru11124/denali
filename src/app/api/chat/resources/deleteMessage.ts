import { request } from '../request';

interface DeleteMessageRequest {
  threadId: string;
  messageId: string;
}

const deleteMessage = ({ threadId, messageId }: DeleteMessageRequest) =>
  request().delete(`/api/thread/${threadId}/message/${messageId}`);

export default deleteMessage;

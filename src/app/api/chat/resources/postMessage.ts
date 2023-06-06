import { request } from '../request';
import { PostMessageRequest } from '../types';

const postMessage = (
  threadId: string,
  { reply, ...rest }: PostMessageRequest
) =>
  request().post(`/api/thread/${threadId}/message`, {
    ...rest,
    replyMessageId: reply?.id,
  });

export default postMessage;

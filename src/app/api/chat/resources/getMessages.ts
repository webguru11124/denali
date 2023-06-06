import { request } from '../request';
import { MessagesResponse, GetMessagesRequest } from '../types';

const getMessages = ({
  id,
  continuationToken,
  pageSize = 20,
}: GetMessagesRequest) =>
  request().get<MessagesResponse>(`/api/thread/${id}/message`, {
    params: {
      continuationToken,
      pageSize,
    },
  });

export default getMessages;

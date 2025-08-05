import { request } from '../request';
import { ChatTokenResponse } from '../types';

const getChatToken = () =>
  request().get<ChatTokenResponse>('/api/token', {
    params: {
      'api-version': 2,
    },
  });

export default getChatToken;

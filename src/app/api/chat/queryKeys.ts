import { GetAvailableParticipantsRequest } from './types';

const MODULE_NAME = 'chat';

export default {
  getChatToken: () => [MODULE_NAME, 'token'],
  getThreads: () => [MODULE_NAME, 'threads'],
  getThread: (id: string) => [MODULE_NAME, 'thread', id],
  getMessages: (id: string) => [MODULE_NAME, 'messages', id],
  getThreadParticipants: (id: string) => [
    MODULE_NAME,
    'thread-participants',
    id,
  ],
  getAcsToken: (apiToken: string) => [MODULE_NAME, 'acsToken', apiToken],
  getAvailableParticipants: ({
    query,
    limit,
  }: GetAvailableParticipantsRequest) => [
    MODULE_NAME,
    'available-participants',
    query,
    limit,
  ],
  getSettings: () => [MODULE_NAME, 'settings'],
};

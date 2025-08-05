import { request } from '../request';
import { ThreadParticipantsResponse } from '../types';

const getThreadParticipants = (id: string) =>
  request().get<ThreadParticipantsResponse>(`/api/thread/${id}/participant`);

export default getThreadParticipants;

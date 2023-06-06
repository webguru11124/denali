import { request } from '../request';

interface CreateThreadRequest {
  topic: string;
  participants: Array<number>;
}

const createThread = ({ topic, participants }: CreateThreadRequest) =>
  request().post('/api/thread', { topic, participantsIds: participants });

export default createThread;

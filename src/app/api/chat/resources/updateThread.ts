import { request } from '../request';
import { UpdateThreadRequest } from '../types';

const updateThread = (id: string, data: UpdateThreadRequest) =>
  request().patch(`/api/thread/${id}`, data);

export default updateThread;

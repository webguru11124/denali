import { request } from '../request';
import { Thread } from '../types';

const getThread = (id: string) => request().get<Thread>(`/api/thread/${id}`);

export default getThread;

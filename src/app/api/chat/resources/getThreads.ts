import { request } from '../request';
import { ThreadsResponse } from '../types';

const getThreads = () => request().get<ThreadsResponse>('/api/thread');

export default getThreads;

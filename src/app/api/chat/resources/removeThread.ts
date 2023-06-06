import { request } from '../request';

const removeThread = (id: string) => request().delete(`/api/thread/${id}`);

export default removeThread;

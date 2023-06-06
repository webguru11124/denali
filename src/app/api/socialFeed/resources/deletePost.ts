import { request } from '../../request';

const deletePost = (id: number) => request().delete(`/api/v1/socialFeed/${id}`);

export default deletePost;

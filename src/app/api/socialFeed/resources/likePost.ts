import { request } from '../../request';

const likePost = (id: number) =>
  request().patch(`/api/v1/socialFeed/${id}/like`);

export default likePost;

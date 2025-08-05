import { request } from '../../request';

const likePostComment = (postId: number, commentId: number) =>
  request().patch(`/api/v1/socialFeed/${postId}/comments/${commentId}/like`);

export default likePostComment;

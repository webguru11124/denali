import { request } from '../../request';

const deletePostComment = (postId: number, commentId: number) =>
  request().delete(`/api/v1/socialFeed/${postId}/comments/${commentId}`);

export default deletePostComment;

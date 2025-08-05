import { request } from '../../request';

const likeComment = (articleId: number, commentId: number) =>
  request().patch(`/api/v1/news-feed/${articleId}/comments/${commentId}/like`);

export default likeComment;

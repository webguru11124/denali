import { request } from '../../request';
import { EditArticleCommentResponse } from '../types';

const editArticleComment = (articleId: number, commentId: number) =>
  request().delete<EditArticleCommentResponse>(
    `api/v1/news-feed/${articleId}/comments/${commentId}`
  );

export default editArticleComment;

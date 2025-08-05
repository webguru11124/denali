import { request } from '../../request';
import { EditArticleCommentResponse } from '../types';

const editArticleComment = (
  articleId: number,
  commentId: number,
  content: string
) =>
  request().put<EditArticleCommentResponse>(
    `api/v1/news-feed/${articleId}/comments/${commentId}`,
    {
      content,
    }
  );

export default editArticleComment;

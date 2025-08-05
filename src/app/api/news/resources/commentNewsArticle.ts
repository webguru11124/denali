import { request } from '../../request';
import { NewsDataResponseProps, CommentData } from '../types';

const commentNewsArticle = (id: number, data: CommentData) =>
  request().post<NewsDataResponseProps>(
    `/api/v1/news-feed/${id}/comments`,
    data
  );

export default commentNewsArticle;

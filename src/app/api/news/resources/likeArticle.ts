import { request } from '../../request';
import { LikeNewsArticleResponse } from '../types';

const getNews = (id: number) =>
  request().patch<LikeNewsArticleResponse>(`/api/v1/news-feed/${id}/like`);

export default getNews;

import { request } from '../../request';
import { NewsArticleResponseProps } from '../types';

const getNewsArticle = (id: number) =>
  request().get<NewsArticleResponseProps>(`/api/v1/news-feed/${id}`);

export default getNewsArticle;

import { request } from '../../request';
import { NewsDataResponseProps } from '../types';

const getNews = (searchQuery?: string, category?: string) =>
  request().get<NewsDataResponseProps>(`/api/v1/news-feed/relevant`, {
    params: {
      query: searchQuery,
      categories: category,
    },
  });

export default getNews;

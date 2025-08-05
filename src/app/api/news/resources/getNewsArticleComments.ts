import { request } from '../../request';
import { NewsArticleCommentsResponse } from '../types';

interface Query {
  perPage?: number;
  page?: number;
}

const defaultQueryData = {
  perPage: 10,
  page: 1,
};

const getNews = (id: number, { perPage, page }: Query = defaultQueryData) =>
  request().get<NewsArticleCommentsResponse>(
    `/api/v1/news-feed/${id}/comments`,
    {
      params: {
        per_page: perPage,
        page,
      },
    }
  );

export default getNews;

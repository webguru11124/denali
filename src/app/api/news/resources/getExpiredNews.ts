import { request } from '../../request';
import { ArchivedNewsDataResponse } from '../types';

const getExpiredNews = (
  page = 1,
  perPage = 10,
  searchQuery?: string,
  category?: string
) =>
  request().get<ArchivedNewsDataResponse>(`/api/v1/news-feed/expired`, {
    params: {
      query: searchQuery,
      per_page: perPage,
      page,
      categories: category,
    },
  });

export default getExpiredNews;

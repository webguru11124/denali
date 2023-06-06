import { request } from '../../request';
import { CategoriesResponse } from '../types';

const getCategories = (page = 1, perPage = 100) =>
  request().get<CategoriesResponse>(`/api/v1/news-feed/categories`, {
    params: {
      perPage,
      page,
    },
  });

export default getCategories;

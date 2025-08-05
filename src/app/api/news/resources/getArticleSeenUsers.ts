import { request } from '../../request';
import { ArticleSeenByUsersResponse } from '../types';

const getArticleSeenUsers = (articleId: number) =>
  request().get<ArticleSeenByUsersResponse>(
    `/api/v1/news-feed/${articleId}/seen/by-users`
  );

export default getArticleSeenUsers;

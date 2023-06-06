import config from 'app/config';
import { ArticleFilter } from 'app/pages/Articles/context';
import { ArticleApi } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';

const perPage = 20;

const getArticles = (page: number, filters: ArticleFilter) =>
  new ArticleApi(undefined, config.env.articlesApiUrl, request())
    .getArticlePage(
      page,
      perPage,
      filters.title,
      filters.status,
      filters.createdBy,
      filters.channelId,
      filters.live,
      filters.unseen,
      filters.timezone,
      undefined,
      filters.archivedAt,
      filters.createdAt,
      filters.publishedAt,
      undefined,
      'audiences'
    )
    .then((response) => response.data);

export default getArticles;

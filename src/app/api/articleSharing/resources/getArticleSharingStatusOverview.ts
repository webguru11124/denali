import { request } from 'app/api/articles/request';
import config from 'app/config';
import { SharedContentApi } from 'common-ui/generated/api/gcs';

const getArticleSharingStatusOverview = (articleId: number) =>
  new SharedContentApi(undefined, config.env.articlesApiUrl, request())
    .getArticleSharingStatusOverview(articleId, 'tenants')
    .then((response) => response.data);

export { getArticleSharingStatusOverview };
export default getArticleSharingStatusOverview;

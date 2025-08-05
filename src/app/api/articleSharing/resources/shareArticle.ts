import { request } from 'app/api/articles/request';
import config from 'app/config';
import {
  ShareArticleRequest,
  SharedContentApi,
} from 'common-ui/generated/api/gcs';

const shareArticle = (params: ShareArticleRequest) =>
  new SharedContentApi(undefined, config.env.articlesApiUrl, request())
    .shareArticle(false, params)
    .then((response) => response.data);

export { shareArticle };
export default shareArticle;

import { request } from 'app/api/articles/request';
import config from 'app/config';
import {
  DeleteSharedArticleRequest,
  SharedContentApi,
} from 'common-ui/generated/api/gcs';

const deleteSharedArticle = (
  deleteSharedArticleRequest: DeleteSharedArticleRequest
) =>
  new SharedContentApi(undefined, config.env.articlesApiUrl, request())
    .deleteSharedArticle(undefined, deleteSharedArticleRequest)
    .then((response) => response.data);

export { deleteSharedArticle };
export default deleteSharedArticle;

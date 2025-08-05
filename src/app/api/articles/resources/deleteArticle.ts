import config from 'app/config';
import { ArticleApi } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const deleteArticle = ({ id }: { id: number }) =>
  new ArticleApi(undefined, config.env.articlesApiUrl, request())
    .deleteArticle(id)
    .then((response) => response.data);

export { deleteArticle };
export default deleteArticle;

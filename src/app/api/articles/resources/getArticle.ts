import config from 'app/config';
import { ArticleApi } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const getArticle = ({ id }: { id: number }) =>
  new ArticleApi(undefined, config.env.articlesApiUrl, request())
    .getArticle(id)
    .then((response) => response.data);

export { getArticle };
export default getArticle;

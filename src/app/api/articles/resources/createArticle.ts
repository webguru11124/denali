import config from 'app/config';
import { ArticleApi, NewArticle } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const createArticle = ({ article }: { article: NewArticle }) =>
  new ArticleApi(undefined, config.env.articlesApiUrl, request())
    .createNewArticle(undefined, article)
    .then((response) => response.data);

export { createArticle };
export default createArticle;

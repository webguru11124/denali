import config from 'app/config';
import { ArticleApi, UpdatedArticle } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const updateArticle = ({ article }: { article: UpdatedArticle }) =>
  new ArticleApi(undefined, config.env.articlesApiUrl, request())
    .updateArticle(false, article)
    .then((response) => response.data);

export { updateArticle };
export default updateArticle;

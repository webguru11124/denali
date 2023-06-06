import config from 'app/config';
import { ArchiveArticleApi } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const archiveArticle = ({ articleIds }: { articleIds: number[] }) =>
  new ArchiveArticleApi(undefined, config.env.articlesApiUrl, request())
    .archiveArticle(undefined, { articleIds })
    .then((response) => response.data);

export { archiveArticle };
export default archiveArticle;

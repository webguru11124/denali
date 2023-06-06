import config from 'app/config';
import { ArchiveArticleApi } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const unArchiveArticle = ({ articleIds }: { articleIds: number[] }) =>
  new ArchiveArticleApi(undefined, config.env.articlesApiUrl, request())
    .unarchiveArticle(undefined, { articleIds })
    .then((response) => response.data);

export { unArchiveArticle };
export default unArchiveArticle;

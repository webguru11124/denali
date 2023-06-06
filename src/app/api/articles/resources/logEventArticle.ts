import config from 'app/config';
import { EventApi } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';

const logEventArticle = (articleId: number) =>
  new EventApi(undefined, config.env.articlesApiUrl, request()).postEvent(
    undefined,
    {
      event: 'seen',
      objectType: 'article',
      objectId: articleId,
    }
  );

export { logEventArticle };
export default logEventArticle;

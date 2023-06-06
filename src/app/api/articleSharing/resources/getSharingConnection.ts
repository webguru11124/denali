import { request } from 'app/api/articles/request';
import config from 'app/config';
import { SharingConnectionApi } from 'common-ui/generated/api/gcs';

const getSharingConnection = (include?: string) =>
  new SharingConnectionApi(undefined, config.env.articlesApiUrl, request())
    .getSharingConnection(include)
    .then((response) => response.data);

export { getSharingConnection };
export default getSharingConnection;

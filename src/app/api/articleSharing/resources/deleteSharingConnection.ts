import { request } from 'app/api/articles/request';
import config from 'app/config';
import { SharingConnectionApi } from 'common-ui/generated/api/gcs';

const deleteSharingConnection = (connectionId: number) =>
  new SharingConnectionApi(undefined, config.env.articlesApiUrl, request())
    .deleteSharingConnection(connectionId)
    .then((response) => response.data);

export { deleteSharingConnection };
export default deleteSharingConnection;

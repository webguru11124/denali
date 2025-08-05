import config from 'app/config';
import { FileApi } from 'common-ui/generated/api/gcs';

import { request } from '../request';

const getFile = ({
  tenant,
  fileId,
  fileName,
  responseType,
}: {
  tenant: string;
  fileId: string;
  fileName: string;
  responseType?: 'redirect' | 'url';
}) =>
  new FileApi(undefined, config.env.articlesApiUrl, request())
    .getFile(tenant, fileId, fileName, responseType ?? 'redirect', true)
    .then((response) =>
      responseType === 'url' ? response.data : response.headers
    );

type AttachedFile = Awaited<ReturnType<typeof getFile>>;

export type { AttachedFile };
export { getFile };
export default getFile;

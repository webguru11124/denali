import { createCustomInstance } from 'app/api/request';
import config from 'app/config';
import { FileApi, FileSlot } from 'submodules/common-ui/generated/api/gcs';

const createFileSlot = ({ mimeType, name }: FileSlot) => {
  const instance = createCustomInstance({ disableCamelCaseConversion: true });
  return new FileApi(undefined, config.env.articlesApiUrl, instance)
    .createFileSlot(undefined, { mimeType, name })
    .then((response) => response.data);
};

export default createFileSlot;

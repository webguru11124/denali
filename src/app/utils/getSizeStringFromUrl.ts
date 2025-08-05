import { logger } from 'app/utils';
import axios, { AxiosInstance } from 'axios';
import prettyBytes from 'pretty-bytes';

const createGetSizeStringFromUrl =
  (instance: AxiosInstance) => async (url: string) => {
    try {
      const response = await instance.head(url, {
        method: 'HEAD',
      });
      const size = Number(response.headers?.['content-length']);

      if (!Number.isNaN(size)) {
        return prettyBytes(size, { maximumFractionDigits: 0 });
      }
    } catch (e) {
      logger.error(e);
    }

    return undefined;
  };

const defaultInstance = axios.create();
defaultInstance.defaults.withCredentials = true;

const getSizeStringFromUrl = createGetSizeStringFromUrl(defaultInstance);

export { createGetSizeStringFromUrl };

export default getSizeStringFromUrl;

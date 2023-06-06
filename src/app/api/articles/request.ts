import config from 'app/config';

import { createInstance } from '../request';

export const BASE_CONFIG = {
  apiUrl: config.env.articlesApiUrl,
};

interface SetRequestHeadersData {
  token?: string;
}

let requestInstance = createInstance(BASE_CONFIG);

const setRequestHeaders = ({ token }: SetRequestHeadersData) => {
  requestInstance = createInstance({
    ...BASE_CONFIG,
    token,
  });

  requestInstance.defaults.withCredentials = true;
};

const request = () => requestInstance;

const reset = () => {
  requestInstance = createInstance(BASE_CONFIG);
};

export { setRequestHeaders, request, reset };

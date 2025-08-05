import config from 'app/config';

import { createInstance } from '../request';

export const BASE_CONFIG = {
  apiUrl: config.env.chatUri,
};

interface SetRequestHeadersData {
  chatToken?: string;
  token?: string;
}

let requestInstance = createInstance(BASE_CONFIG);

const setRequestHeaders = ({ chatToken, token }: SetRequestHeadersData) => {
  requestInstance = createInstance({
    ...BASE_CONFIG,
    token,
    chatToken,
  });
  // TODO: remove in prod env
  requestInstance.defaults.withCredentials = true;
};

const request = () => requestInstance;

const reset = () => {
  requestInstance = createInstance(BASE_CONFIG);
};

export { setRequestHeaders, request, reset };

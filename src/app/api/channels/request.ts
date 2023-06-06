import config from 'app/config';
import { store } from 'app/store';

import { createInstance } from '../request';

export const BASE_CONFIG = {
  apiUrl: config.env.channelsApiUrl,
};

interface SetRequestHeadersData {
  token?: string;
}

let requestInstance = createInstance({
  ...BASE_CONFIG,
  token: store.getState().auth.token?.toString(),
});

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

export { setRequestHeaders, reset, request };

import { store } from 'app/store';
import { actions } from 'app/store/config';
import { resetState } from 'app/store/utils';
import axios, { AxiosInstance } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';

// TODO: refactor API client into a more straighforward implementation
//
// Currently it is an extremely mutable API client implementation
// - hard to follow
// - easy to introduce mistakes
// - not sure when the state changes

interface CreateInstanceData {
  apiUrl?: string;
  token?: string;
  contentLanguage?: string;
  chatToken?: string;
  mock?: string;
  disableCamelCaseConversion?: boolean;
}

type CreateInstance = (data: CreateInstanceData) => AxiosInstance;

let cachedToken: string | undefined;
let cachedContentLanguage = 'en';
let cachedApiUrl: string | undefined;

const API_HOSTNAME_VERSION = 'v2';

const createInstance: CreateInstance = ({
  apiUrl,
  token,
  contentLanguage,
  chatToken,
  mock,
  disableCamelCaseConversion,
}): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiUrl,
  });

  instance.interceptors.request.use((requestConfig) => {
    const updatedConfig = { ...requestConfig };
    updatedConfig.headers = {};
    updatedConfig.withCredentials = true;

    if (contentLanguage) {
      updatedConfig.headers['content-language'] = contentLanguage;
    }

    updatedConfig.headers['Hostname-Version'] = API_HOSTNAME_VERSION;
    updatedConfig.headers['Accept'] = 'application/json';

    if (token) {
      updatedConfig.headers.authorization = `Bearer ${token}`;
    }

    if (apiUrl) {
      updatedConfig.headers.tenant = apiUrl;
    }

    if (chatToken) {
      updatedConfig.headers['acs-token'] = chatToken;
    }

    if (mock) {
      updatedConfig.headers['Mock'] = mock;
    }
    updatedConfig.headers['api-name'] = 'gcs';

    return updatedConfig;
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.message === 'Bearer token is not valid'
      ) {
        store.dispatch(actions.tokenExpired(true));
        resetState();
      }

      return Promise.reject(error);
    }
  );

  if (disableCamelCaseConversion !== true) {
    instance.interceptors.response.use((response) => {
      const updatedResponse = { ...response };

      updatedResponse.data = camelcaseKeys(updatedResponse.data, {
        deep: true,
      });

      return updatedResponse;
    });
  }

  return instance;
};

let requestInstance: AxiosInstance = createInstance({});

const resetInstance = () => {
  requestInstance = createInstance({
    apiUrl: cachedApiUrl,
    token: cachedToken,
    contentLanguage: cachedContentLanguage,
  });
};

const setRequestInstance = (url: string) => {
  cachedApiUrl = url;

  resetInstance();
};

const setRequestToken = (newToken: string) => {
  cachedToken = newToken;

  resetInstance();
};

const setContentLanguage = (lang: string) => {
  cachedContentLanguage = lang;

  resetInstance();
};

const reset = () => {
  cachedToken = undefined;
  resetInstance();
};

const request = () => requestInstance;

const createCustomInstance = ({
  disableCamelCaseConversion,
}: {
  disableCamelCaseConversion: boolean;
}) =>
  createInstance({
    apiUrl: cachedApiUrl,
    token: cachedToken,
    contentLanguage: cachedContentLanguage,
    disableCamelCaseConversion: disableCamelCaseConversion,
  });

export {
  request,
  setRequestInstance,
  setRequestToken,
  setContentLanguage,
  createInstance,
  createCustomInstance,
  reset,
};

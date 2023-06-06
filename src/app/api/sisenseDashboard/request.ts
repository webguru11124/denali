import config from 'app/config';
import axios, { AxiosInstance } from 'axios';

interface CreateInstanceData {
  apiUrl?: string;
  token?: string;
}

type CreateInstance = (data: CreateInstanceData) => AxiosInstance;

const createInstance: CreateInstance = ({
  apiUrl,
  token,
}): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiUrl,
  });
  instance.interceptors.request.use((requestConfig) => {
    const updatedConfig = { ...requestConfig };
    updatedConfig.headers = {};
    updatedConfig.withCredentials = true;
    updatedConfig.headers['Accept'] = 'application/json';

    if (token) {
      updatedConfig.headers.authorization = `Bearer ${token}`;
    }

    return updatedConfig;
  });

  return instance;
};

const requestInstance = createInstance({
  apiUrl: config.env.sisenseUrl,
  token: config.env.sisenseToken,
});

const request = () => requestInstance;

export default request;

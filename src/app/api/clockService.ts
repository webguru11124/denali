import config from 'app/config';
import axios, { AxiosResponse } from 'axios';

export default {
  getEpochTime: async () => {
    try {
      const { data } = await axios.get(`${config.env.identityServerUri}/clock`);

      return data.timestamp;
    } catch (e) {
      return Date.now() / 1000;
    }
  },
};

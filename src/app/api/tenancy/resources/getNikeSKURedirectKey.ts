import { request } from '../../request';
import { GetRedirectKeyResponse } from '../types';

const getRedirectKey = () =>
  request().get<GetRedirectKeyResponse>('/api/v1/me/redirect');

export default getRedirectKey;

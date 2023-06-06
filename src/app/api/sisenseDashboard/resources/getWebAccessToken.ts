
import { request } from '../requestIdentity';
import { TokenResponse } from '../types';

const getWebAccessToken = () =>
  request().post<TokenResponse>(`/sisense/webaccesstoken`);


export default getWebAccessToken;

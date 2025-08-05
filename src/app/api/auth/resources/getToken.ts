import { request } from '../../request';
import { LoginUserDataProps, TokenResponseProps } from '../types';

const getToken = (userData: LoginUserDataProps) =>
  request().post<TokenResponseProps>(`/oauth/token`, {
    ...userData,
    scope: '*',
    grant_type: 'password',
    client_id: 1,
  });

export default getToken;

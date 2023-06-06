import { Response } from '../types';

export interface GetRedirectKeyResponse {
  redirectKey: string;
}

export interface GetNIKESKUUserData {
  login: string;
  password: string;
}

export type GetNikeSKUUSerResponse = Response<GetNIKESKUUserData>;

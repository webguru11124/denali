import { RootState } from '../types';

import { NAME } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getOriginUrl = (state: RootState) => state[NAME].originUrl;
export const getIsExpiredToken = (state: RootState) =>
  state[NAME].isTokenExpired;

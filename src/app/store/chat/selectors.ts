import { RootState } from '../types';

import { NAME } from './constants';

export const getChatToken = (state: RootState) => state[NAME].chatToken;

export const getChatTokenExpiresOn = (state: RootState) =>
  state[NAME].chatTokenExpiresOn;

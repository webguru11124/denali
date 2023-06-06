import { RootState } from '../types';

import { NAME } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getRequestInstanceReady = (state: RootState) =>
  state[NAME].requestInstanceReady;

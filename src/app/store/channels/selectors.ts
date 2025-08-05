import { RootState } from '../types';

import { NAME } from './constants';
export const getChannels = (state: RootState) => state[NAME].channels;
export const getRelevantChannels = (state: RootState) =>
  state[NAME].relevantChannels;

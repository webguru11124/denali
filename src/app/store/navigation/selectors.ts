/* eslint-disable import/prefer-default-export */
import { RootState } from '../types';

import { NAME } from './constants';

export const getIsSidebarOpen = (state: RootState) =>
  state[NAME].isSideMenuOpen;

export const getIsFullPage = (state: RootState) => state[NAME].isFullPage;

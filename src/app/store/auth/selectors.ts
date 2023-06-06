import { RootState } from '../types';

import { NAME } from './constants';

export const getToken = (state: RootState) => state[NAME].token;
export const getSelectedTenant = (state: RootState) =>
  state[NAME].selectedTenant;
export const getTranslationLanguage = (state: RootState) =>
  state[NAME].translationLanguage;
export const getTenants = (state: RootState) => state[NAME].tenants;

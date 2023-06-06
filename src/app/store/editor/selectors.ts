/* eslint-disable import/prefer-default-export */
import { RootState } from '../types';

import { NAME } from './constants';

export const getSelectedAudiences = (state: RootState) => state[NAME].audiences;
export const getSelecteCollaborators = (state: RootState) =>
  state[NAME].collaborators;
export const getSelectedLanguages = (state: RootState) => state[NAME].languages;

export const getActiveLanguage = (state: RootState) => {
  const active = state[NAME].languages.find((lang) => lang.active)?.code;
  const main = state[NAME].languages.find((lang) => lang.isDefault)?.code;

  return active ?? main ?? 'en';
};

export const getSelectedChannel = (state: RootState) => state[NAME].channel;

export const getCurrentArticleId = (state: RootState) =>
  state[NAME].currentArticleId;

export const getPublishDate = (state: RootState) => state[NAME].publishDate;
export const getArchiveDate = (state: RootState) => state[NAME].archiveDate;

export const getCanEdit = (state: RootState) => state[NAME].canEdit;

/* eslint-disable import/prefer-default-export */
import { RootState } from '../types';

import { NAME } from './constants';

export const getArticlesTab = (state: RootState) => state[NAME].articlesTab;

export const getAudiencesTab = (state: RootState) => state[NAME].audiencesTab;

export const getMembersTab = (state: RootState) => state[NAME].membersTab;

import { RootState } from '../types';

import { NAME } from './constants';

export const getFilterLocationID = (state: RootState) =>
  state[NAME].filterLocationID;

export const getSelectedDateRange = (state: RootState) =>
  state[NAME].selectedDateRange;

export const getSelectedStartDate = (state: RootState) => state[NAME].startDate;

export const getSelectedEndDate = (state: RootState) => state[NAME].endDate;

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import {
  State,
  FilterLocationID,
  SelectedDateRange,
  CustomSelectedDateRange,
} from './types';

const initialState: State = {
  filterLocationID: undefined,
  selectedDateRange: undefined,
  startDate: undefined,
  endDate: undefined,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    locationSelected: (state, { payload }: PayloadAction<FilterLocationID>) => {
      state.filterLocationID = payload;
    },
    dateRangeSelected: (
      state,
      { payload }: PayloadAction<SelectedDateRange>
    ) => {
      state.selectedDateRange = payload;
      state.startDate = undefined;
      state.endDate = undefined;
    },
    dateCustomRangeSelected: (
      state,
      { payload }: PayloadAction<CustomSelectedDateRange>
    ) => {
      state.selectedDateRange = payload.selectedDateRange;
      state.startDate = payload.startDate;
      state.endDate = payload.endDate;
    },
    stateReset: () => initialState,
  },
});

export default slice;

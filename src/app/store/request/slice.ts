/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import { State } from './types';

const initialState: State = {
  requestInstanceReady: false,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    requestInstanceUpdated: (state, { payload }: PayloadAction<boolean>) => {
      state.requestInstanceReady = payload;
    },
    stateReset: () => initialState,
  },
});

export default slice;

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import { State } from './types';

const initialState: State = {
  originUrl: undefined,
  isTokenExpired: false,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    originUrlChanged: (state, { payload }: PayloadAction<string>) => {
      state.originUrl = payload;
    },
    tokenExpired: (state, { payload }: PayloadAction<boolean>) => {
      state.isTokenExpired = payload;
    },
    stateReset: () => initialState,
  },
});

export default slice;

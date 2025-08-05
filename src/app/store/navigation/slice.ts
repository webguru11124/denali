/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import { State } from './types';

const initialState: State = {
  isSideMenuOpen: true,
  isFullPage: false,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    sideMenuDisplayChanged: (state, { payload }: PayloadAction<boolean>) => {
      state.isSideMenuOpen = payload;
    },
    setFullPage: (state, { payload }: PayloadAction<boolean>) => {
      state.isFullPage = payload;
    },
    stateReset: () => initialState,
  },
});

export default slice;

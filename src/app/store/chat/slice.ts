/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import { State } from './types';

const initialState: State = {
  chatToken: undefined,
  chatTokenExpiresOn: undefined,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    chatTokenRetrieved: (state, { payload }: PayloadAction<string>) => {
      state.chatToken = payload;
    },
    chatTokenExpiresOnRetrieved: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.chatTokenExpiresOn = payload;
    },
    chatTokenExpired: (state) => {
      state.chatToken = undefined;
      state.chatTokenExpiresOn = undefined;
    },
    stateReset: () => initialState,
  },
});

export default slice;

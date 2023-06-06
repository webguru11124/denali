/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import { State, Tenant } from './types';

const initialState: State = {
  token: null,
  idToken: null,
  selectedTenant: null,
  tenants: null,
  translationLanguage: null,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    tokenRetrieved: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    idTokenRetrieved: (state, { payload }: PayloadAction<string>) => {
      state.idToken = payload;
    },
    tenantSelected: (state, { payload }: PayloadAction<Tenant>) => {
      state.selectedTenant = payload;
    },
    translationLanguageChanged: (state, { payload }: PayloadAction<string>) => {
      state.translationLanguage = payload;
    },
    tenantsRetrieved: (state, { payload }: PayloadAction<Array<Tenant>>) => {
      state.tenants = payload;
    },
    stateReset: () => initialState,
  },
});

export default slice;

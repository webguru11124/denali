/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NAME } from './constants';
import { Modals, SaveAlert, State } from './types';

const initialState: State = {
  saveAlert: {
    message: null,
  },
  modalsOpened: 0,
  modals: {
    modalProps: {},
    modalType: null,
  },
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    saveAlertTriggered: (state, { payload }: PayloadAction<SaveAlert>) => {
      state.saveAlert = payload;
    },
    modalOpened: (state) => {
      state.modalsOpened += 1;
    },
    modalClosed: (state) => {
      state.modalsOpened -= 1;
    },
    showModal: (state, { payload }: PayloadAction<Modals>) => {
      state.modals.modalType = payload.modalType;
      state.modals.modalProps = payload.modalProps;
    },
    hideModal: (state) => {
      state.modals.modalType = null;
      state.modals.modalProps = {};
    },
    stateReset: () => initialState,
  },
});

export default slice;

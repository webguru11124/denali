import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BasicChannelInfo,
  BasicRelevantChannelInfo,
} from 'submodules/common-ui/generated/api/gcs';

import { NAME } from './constants';
import { State } from './types';
const initialState: State = {
  channels: [],
  relevantChannels: [],
};
const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setRelevantChannels: (
      state,
      { payload }: PayloadAction<BasicRelevantChannelInfo[]>
    ) => {
      state.relevantChannels = payload;
    },
    updateRelevantChannel: (
      state,
      { payload }: PayloadAction<Partial<BasicRelevantChannelInfo>>
    ) => {
      const index = state.relevantChannels.findIndex(
        (channel) => channel.id === payload.id
      );
      if (index === -1) return;
      const newArray = [...state.relevantChannels];
      newArray[index] = { ...newArray[index], ...payload };
      state.relevantChannels = newArray;
    },
    deleteRelevantChannel: (
      state,
      { payload }: PayloadAction<BasicChannelInfo>
    ) => {
      state.relevantChannels = state.relevantChannels.filter(
        (channel) => channel.id !== payload.id
      );
    },
    setChannels: (state, { payload }: PayloadAction<BasicChannelInfo[]>) => {
      state.channels = payload;
    },
    updateChannel: (state, { payload }: PayloadAction<BasicChannelInfo>) => {
      const index = state.channels.findIndex(
        (channel) => channel.id === payload.id
      );
      const newArray = [...state.channels];
      newArray[index] = payload;
      state.channels = newArray;
    },
    setChannel: (state, { payload }: PayloadAction<BasicChannelInfo>) => {
      state.channels = [payload, ...state.channels];
    },
    deleteChannel: (state, { payload }: PayloadAction<BasicChannelInfo>) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload.id
      );
    },
  },
});
export default slice;

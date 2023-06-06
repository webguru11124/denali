/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStatus } from 'app/api/user/types';

import { NAME } from './constants';
import { State } from './types';

const initialState: State = {
  articlesTab: 'draft',
  audiencesTab: 'available',
  membersTab: UserStatus.active,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setArticlesTab: (
      state,
      { payload }: PayloadAction<State['articlesTab']>
    ) => {
      state.articlesTab = payload;
    },
    setAudiencesTab: (state, { payload }: PayloadAction<string>) => {
      state.audiencesTab = payload;
    },
    setMembersTab: (state, { payload }: PayloadAction<string>) => {
      state.audiencesTab = payload;
    },
    stateReset: () => initialState,
  },
});

export default slice;

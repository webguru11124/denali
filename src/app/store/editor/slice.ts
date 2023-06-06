/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import { NAME } from './constants';
import { Audience, Collaborator, Language, State } from './types';

const initialState: State = {
  audiences: [],
  collaborators: [],
  languages: [],
  currentArticleId: undefined,
  channel: null,
  publishDate: undefined,
  archiveDate: undefined,
  canEdit: true,
};

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    addLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.languages = uniqBy(
        [
          ...state.languages,
          {
            name: payload.name,
            code: payload.code,
            isDefault: payload.isDefault,
            active: payload.active,
          },
        ],
        'code'
      );
    },
    removeLanguage: (state, { payload }: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (language) => language.code !== payload
      );
      state.collaborators = state.collaborators.map(
        (collaborator): Collaborator => {
          return {
            ...collaborator,
            languages: collaborator.languages.filter((l) => l !== payload),
          };
        }
      );
    },
    updateLanguages: (state, { payload }: PayloadAction<Language[]>) => {
      if (state.languages.length === 0) {
        state.languages = payload;
      }
    },
    setMainLanguage: (state, { payload }: PayloadAction<string>) => {
      state.languages = state.languages.map((language): Language => {
        return { ...language, isDefault: language.code === payload };
      });
    },
    setActiveLanguage: (state, { payload }: PayloadAction<string>) => {
      state.languages = state.languages.map((language) => {
        return { ...language, active: language.code === payload };
      });
    },
    addCollaborator: (state, { payload }: PayloadAction<Collaborator>) => {
      state.collaborators = uniqBy(
        [
          ...state.collaborators,
          {
            id: payload.id,
            fullName: payload.fullName,
            avatar: payload.avatar,
            languages: payload.languages,
            email: payload.email,
          },
        ],
        'id'
      );
    },
    removeCollaborator: (state, { payload }: PayloadAction<number>) => {
      state.collaborators = state.collaborators.filter(
        (collaborator) => collaborator.id !== payload
      );
    },
    removeCollaborators: (state) => {
      state.collaborators = [];
    },
    updateCollaborators: (
      state,
      { payload }: PayloadAction<Collaborator[]>
    ) => {
      if (state.collaborators.length === 0) {
        state.collaborators = payload;
        return;
      }

      payload.forEach((collaborator) => {
        state.collaborators.forEach((current) => {
          if (current.id === collaborator.id) {
            current.fullName = collaborator.fullName;
            current.avatar = collaborator.avatar;
          }
        });
      });
    },
    updateCollaboratorLanguages: (
      state,
      { payload }: PayloadAction<{ id: number; code: string }>
    ) => {
      state.collaborators.forEach((c) => {
        if (c.id === payload.id) {
          if (!c.languages.includes(payload.code)) {
            c.languages = [...c.languages, payload.code];
            return;
          }

          if (c.languages.length - 1 > 0) {
            c.languages = c.languages.filter((l) => l !== payload.code);
          }
        }
      });
    },
    addAudience: (state, { payload }: PayloadAction<Audience>) => {
      state.audiences = uniqBy(
        [
          ...state.audiences,
          {
            id: payload.id,
            name: payload.name,
            members: payload.members,
          },
        ],
        'id'
      );
    },
    removeAudience: (state, { payload }: PayloadAction<number>) => {
      state.audiences = state.audiences.filter(
        (audience) => audience.id !== payload
      );
    },
    removeAudiences: (state) => {
      state.audiences = [];
    },
    updateAudiences: (state, { payload }: PayloadAction<Audience[]>) => {
      if (state.audiences.length === 0) {
        state.audiences = payload;
        return;
      }

      payload.forEach((audience) => {
        state.audiences.forEach((current) => {
          if (current.id === audience.id) {
            current.name = audience.name;
            current.members = audience.members;
          }
        });
      });
    },
    setCurrentArticleId: (
      state,
      { payload }: PayloadAction<number | undefined>
    ) => {
      state.currentArticleId = payload;
    },
    addChannel: (
      state,
      { payload }: PayloadAction<BasicChannelInfo | null>
    ) => {
      state.channel = payload;
    },
    setPublishDate: (state, { payload }: PayloadAction<string | undefined>) => {
      state.publishDate = payload;
    },
    setArchiveDate: (state, { payload }: PayloadAction<string | undefined>) => {
      state.archiveDate = payload;
    },
    setCanEdit: (state, { payload }: PayloadAction<boolean>) => {
      state.canEdit = payload;
    },
    stateReset: () => {
      return initialState;
    },
  },
});

export default slice;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createReduxEnhancer } from '@sentry/react';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { NAME as AUTH_NAME } from './auth/constants';
import authSlice from './auth/slice';
import { NAME as CHANNELS_NAME } from './channels/constants';
import channelsSlice from './channels/slice';
import { NAME as CHAT_NAME } from './chat/constants';
import chatSlice from './chat/slice';
import { NAME as COMMON_NAME } from './common/constants';
import commonSlice from './common/slice';
import { NAME as CONFIG_NAME } from './config/constants';
import configSlice from './config/slice';
import { NAME as EDITOR_NAME } from './editor/constants';
import editorSlice from './editor/slice';
import { NAME as KPIS_NAME } from './kpis/constants';
import kpisSlice from './kpis/slice';
import { NAME as MODAL_NAME } from './modal/constants';
import modalSlice from './modal/slice';
import { NAME as NAVIGATION_NAME } from './navigation/constants';
import navigationSlice from './navigation/slice';
import { NAME as REQUEST_NAME } from './request/constants';
import requestSlice from './request/slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [AUTH_NAME, CHAT_NAME, COMMON_NAME],
};

const sentryReduxEnhancer = createReduxEnhancer();

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [AUTH_NAME]: authSlice.reducer,
    [MODAL_NAME]: modalSlice.reducer,
    [KPIS_NAME]: kpisSlice.reducer,
    [REQUEST_NAME]: requestSlice.reducer,
    [NAVIGATION_NAME]: navigationSlice.reducer,
    [CHAT_NAME]: chatSlice.reducer,
    [EDITOR_NAME]: editorSlice.reducer,
    [CONFIG_NAME]: configSlice.reducer,
    [COMMON_NAME]: commonSlice.reducer,
    [CHANNELS_NAME]: channelsSlice.reducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: [sentryReduxEnhancer],
});

const persistor = persistStore(store);

export { store, persistor };

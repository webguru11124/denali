import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReducerAction<T> = CaseReducer<AppDispatch, PayloadAction<T>>;

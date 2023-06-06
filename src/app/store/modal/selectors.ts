import { RootState } from '../types';

import { NAME } from './constants';

export const getSaveAlert = (state: RootState) => state[NAME].saveAlert;
export const getModalsOpened = (state: RootState) => state[NAME].modalsOpened;
export const getOpenedModals = (state: RootState) => state[NAME].modals;

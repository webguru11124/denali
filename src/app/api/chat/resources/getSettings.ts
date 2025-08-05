import { request } from '../request';
import { Settings } from '../types';

const getSettings = () => request().get<Settings>('/api/settings');

export default getSettings;

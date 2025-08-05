import { request } from '../../request';
import { LanguagesResponse } from '../types';

const getLanguages = () =>
  request().get<LanguagesResponse>('/api/v1/translations/languages');

export default getLanguages;

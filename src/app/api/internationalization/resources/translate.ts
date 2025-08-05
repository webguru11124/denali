import { request } from '../../request';
import { Translations, TranslationResponse } from '../types';

const translate = (dataToTranslate: Translations) =>
  request().post<TranslationResponse>(
    '/api/v1/translations/translate',
    dataToTranslate.map(({ targetLanguage, ...rest }) => ({
      ...rest,
      target_language: targetLanguage,
    }))
  );

export default translate;

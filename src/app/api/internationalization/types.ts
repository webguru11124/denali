import { Response } from '../types';

export interface Language {
  code: string;
  name: string;
}

export type LanguagesResponse = Response<Array<Language>>;

export interface TranslationItem {
  text: string;
  targetLanguage: string;
}

export type Translations = Array<TranslationItem>;

export interface TranslatedItem {
  original: string;
  translation: string;
}

export type TranslationResponse = Response<Array<TranslatedItem>>;

import { ResponsiveMediaSizes } from 'app/api/types';

export type FileType =
  | 'pdf'
  | 'image'
  | 'excel'
  | 'word'
  | 'powerpoint'
  | 'text'
  | 'other';

export interface ImageSources {
  srcSet?: ResponsiveMediaSizes | null;
  src?: string;
}

export type SelectedImageSource = { src?: string; srcSet?: string } | null;

export enum LogLevel {
  trace = 0,
  debug = 1,
  info = 2,
  warn = 3,
  error = 4,
  silent = 5,
}

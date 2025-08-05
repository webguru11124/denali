import { AxiosRequestTransformer } from 'axios';

export type TransformersType =
  | AxiosRequestTransformer
  | Array<AxiosRequestTransformer>
  | undefined;

export type GetAxiosTransformersType = (
  transformers: TransformersType
) => Array<AxiosRequestTransformer>;

export interface ImageSizes {
  small: string;
  medium: string;
  large: string;
}

export interface PaginatedResponseMeta {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}

export interface ResponsiveMediaSizes {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface Response<T> {
  data: T;
}

export interface PaginatedResponse<T extends Array<any>> extends Response<T> {
  meta: PaginatedResponseMeta;
}

export enum ImageType {
  Image = 'image',
  SVG = 'svg',
}

export enum MIMEType {
  ImageGIF = 'image/gif',
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
  ImageSVGXML = 'image/svg+xml',
}

export interface ResponsiveObject {
  id: number;
  type: ImageType;
  mimeType: MIMEType;
  fileName: string;
  name: string;
  url: string;
  sizes: ImageSizes | null;
  transcodedVideo: null;
}

export interface Link {
  url: string;
  title?: string;
}

export interface BaseFile {
  id: number;
  url: string;
  name: string;
}

export interface BaseApiFile {
  fileName: string;
  id: number;
  mimeType: string;
  name: string;
  sizes: ResponsiveMediaSizes | null;
  url: string;
  transcodedVideo: {
    mimeType: string;
    thumbnailUrl: string;
    url: string;
  } | null;
}

export enum FileType {
  image = 'image',
  video = 'video',
  pdf = 'pdf',
  other = 'other',
}

export interface ApiImage extends BaseApiFile {
  type: FileType.image;
}

export interface ApiVideo extends BaseApiFile {
  type: FileType.video;
}

export interface ApiPdf extends BaseApiFile {
  type: FileType.pdf;
}

export interface ApiOtherFile extends BaseApiFile {
  type: FileType.other;
}

export type ApiMediaFile = ApiImage | ApiVideo;
export type NonMediaFile = ApiPdf | ApiOtherFile;

export type ApiFile = ApiImage | ApiVideo | ApiPdf | ApiOtherFile;

export type OrderType = 'asc' | 'desc';
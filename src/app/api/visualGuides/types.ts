import { FileUploadResponse } from '../media/types';
import { ApiFile, Link, Response, ResponsiveMediaSizes } from '../types';

export interface VisualGuide {
  id: number;
  title: string;
  links: Array<Link>;
  brands: Array<number>;
  locations: Array<number>;
  files: Array<ApiFile>;
  media: Array<ApiFile>;
  appearsDate: string | null;
  expiresDate: string | null;
  mediaCount: number;
  allowModify: boolean;
}

export interface UploadFilesData {
  files: Array<FileUploadResponse>;
}

export type UserFile = ApiFile & {
  userId: number;
  userName: string;
  avatars: ResponsiveMediaSizes;
};

export interface VisualGuideFeedbackResponse {
  files: { [key: string]: UserFile };
}

export type VisualGuideResponse = Response<VisualGuide>;

export type VisualGuidesResponse = Response<Array<VisualGuide>>;

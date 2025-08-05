import { FileUploadResponse } from '../media/types';
import {
  ResponsiveMediaSizes,
  ApiFile,
  PaginatedResponse,
  Response,
} from '../types';

export interface Reply {
  activityFeedId: null;
  activityPost: null;
  applaudCount: number;
  applauded: boolean;
  avatars: ResponsiveMediaSizes;
  dateIndex: number;
  feedId: number;
  files: Array<ApiFile>;
  id: number;
  isCompetition: null;
  locationName: string;
  login: null;
  markdown?: boolean;
  name: string;
  quesType: null;
  replies: null;
  text: string;
  textId: number;
  timeago: string;
  title: null;
  userId: number;
}

export interface Post {
  activityFeedId: null;
  activityPost: null;
  applaudCount: number;
  applauded: boolean;
  avatars: ResponsiveMediaSizes;
  dateIndex: number;
  files: Array<ApiFile>;
  id: number;
  isCompetition: null;
  languageCode: string;
  locationId: number;
  locationName: string;
  login: string;
  markdown?: boolean;
  name: string;
  parentFeedId: null;
  quesType: null;
  replies: Array<Reply>;
  text: string;
  textId: number;
  timeago: string;
  title: null;
  userId: number;
}

export type SocialPostResponse = Response<Post>;

export type SocialFeedResponse = PaginatedResponse<Array<Post>>;

export interface CommentData {
  content: string;
}

export interface CreatePostData {
  content: string;
  filesToAdd: Array<FileUploadResponse>;
  languageId: number;
}

export interface UpdatePostData extends CreatePostData {
  filesToRemove: Array<{ id: string }>;
}

export interface GetSocialFeedRequest {
  page: number;
  perPage?: number;
  languageId: number;
}

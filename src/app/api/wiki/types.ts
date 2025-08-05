import {
  ResponsiveMediaSizes,
  Response,
  PaginatedResponse,
  Link,
} from '../types';

export interface WikiArticleListItemProps {
  id: number;
  title: string;
  excerpt: string;
  icon?: string;
  iconSizes?: ResponsiveMediaSizes | null;
  hasChild: boolean;
  markdown: boolean;
  childCount: number;
}

export type WikiListResponseProps = PaginatedResponse<
  Array<WikiArticleListItemProps>
>;

export interface WikiAuthorAvatar {
  fileName: string;
  id: number;
  mimeType: string;
  name: string;
  type: string;
  url: string;
}

export interface WikiTranscodedVideo {
  url: string;
  mimeType: string;
  thumbnailUrl: string;
}

export interface WikiFile {
  fileName: string;
  id: number;
  mimeType: string;
  sizes?: Array<ResponsiveMediaSizes>;
  transcodedVideo?: WikiTranscodedVideo;
  type: string;
  url: string;
}

export interface WikiArticleProps {
  author: {
    avatar: Array<WikiAuthorAvatar>;
    id: number | null;
    firstName: string | null;
    lastName: string | null;
  };
  id: number;
  title: string;
  content: string;
  excerpt: string;
  files: Array<WikiFile>;
  children: Array<WikiArticleListItemProps>;
  markdown: boolean;
  icon?: string;
  iconSizes?: ResponsiveMediaSizes;
  updatedAt: string;
  links: Array<Link>;
  parent: {
    id: number;
    title: string;
  };
}

export type WikiArticleResponseProps = Response<WikiArticleProps>;

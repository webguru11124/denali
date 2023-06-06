import {
  ImageSizes,
  ResponsiveMediaSizes,
  Response,
  PaginatedResponse,
  ApiFile,
  Link,
} from '../types';

export interface CommentData {
  content: string;
}

export enum NewsCategoryType {
  Vote = 'vote',
  Default = 'default',
}

export interface NewsDataProps {
  id: number;
  allowModify: boolean;
  title: string;
  description: string;
  appears: string | null;
  expire: Date;
  categoryType: NewsCategoryType.Vote | NewsCategoryType.Default;
  categoryId: number;
  created?: Date | null;
  categoryTitle: string;
  createdByAvatars: ImageSizes;
  createdById: number;
  createdByName: string;
  isFutureNew: boolean;
  seenByMe: boolean;
  totalUsersSeen: number;
  commentsCount: number;
  markdown: boolean;
}

export interface PollAnswer {
  id: number;
  percent: string;
  text: string;
  voteCount: number;
}

export interface Poll {
  files: Array<ApiFile>;
  headline: string;
  id: number;
  markdown: boolean;
  mySelectedAnswerId: number | null;
  question: string;
  totalVoteCount: number;
  votedByMe: number;
  answers: Array<PollAnswer>;
}

export interface NewsArticleProps {
  id: number;
  allowModify: boolean;
  title: string;
  description: string;
  appears: string | null;
  expire: Date;
  categoryType: NewsCategoryType.Vote | NewsCategoryType.Default;
  categoryId: number;
  createdAt?: Date | null;
  categoryTitle: string;
  createdByAvatars: ImageSizes;
  createdById: number;
  createdByName: string;
  isFutureNew: boolean;
  seenByMe: boolean;
  totalUsersSeen: number;
  commentsCount: number;
  totalUsersLike: number;
  markdown: boolean;
  likedByMe: boolean;
  files: Array<ApiFile>;
  pictures: Array<ApiFile>;
  links: Array<Link>;
  poll: Poll;
  isExpired: boolean;
}

export interface CommentUserLocation {
  id: number;
  name: string;
}

export interface Comment {
  applaudByMe: boolean;
  applaudCount: number;
  createdAt: string;
  createdByMe: boolean;
  id: number;
  userAvatars: ResponsiveMediaSizes;
  userId: number;
  text: string;
  userName: string;
  userLocation: CommentUserLocation;
}

export type EditArticleCommentResponse = Response<Comment>;

export interface LikeNewsArticleResponse {
  likedByMe: boolean;
  newsFeedId: number;
  totalUsersLiked: number;
}

interface Categories {
  angle: number;
  id: number;
  title: string;
  type: string;
}

export interface UnseenAmountResponse {
  count: number;
}

export interface ArticleSeenByTeam {
  locationId: number;
  locationName: string;
  totalUsersInShop: number;
  totalUsersSeen: number;
}

export interface LocationUser {
  seen: boolean;
  userAvatars: ResponsiveMediaSizes;
  userId: number;
  userName: string;
}

export interface SeenLocationResponse {
  locationId: number;
  locationName: string;
  seenByCount: number;
  seenFormerCount: number;
  totalUsersInLocation: number;
  unseenByCount: number;
  unseenFormerCount: number;
  users: Array<LocationUser>;
}

export type ArticleSeenByUsersResponse = Response<Array<LocationUser>>;

export type ArticleSeenByTeamResponse = Array<ArticleSeenByTeam>;

export type CategoriesResponse = PaginatedResponse<Array<Categories>>;

export type NewsArticleCommentsResponse = PaginatedResponse<Array<Comment>>;

export type NewsDataResponseProps = PaginatedResponse<Array<NewsDataProps>>;

export type ArchivedNewsDataResponse = PaginatedResponse<Array<NewsDataProps>>;

export type NewsArticleResponseProps = Response<NewsArticleProps>;

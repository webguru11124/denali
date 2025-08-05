import { Profession, Reward, Location, Language, MemberRole } from '../auth/types';
import { ResponsiveMediaSizes, Response, OrderType, PaginatedResponse, PaginatedResponseMeta } from '../types';

export interface PublicUserProfile {
  id: number;
  allLocations: Array<Location>;
  allProfessions: Array<Profession>;
  avatarsMobile: ResponsiveMediaSizes;
  avatars: ResponsiveMediaSizes;
  brands: Array<string>;
  client: string;
  email: string;
  firstName: string;
  lastName: string;
  lastSeen: string;
  location: Location;
  memberSince: string;
  messengerUsername: string;
  phone: string;
  profession: Profession;
  rewards: Array<Reward>;
  color: string;
  websiteId: number;
}

export type PublicUserProfileResponse = Response<PublicUserProfile>;

export interface PublicUserListProfile {
  id: number;
  fullName: string;
  location: Location;
  profession: Profession;
}

export type PublicUserListProfileResponse = Response<
  Array<PublicUserListProfile>
>;

export interface PublicUserChatDetails extends PublicUserListProfile {
  fullName: string;
  acsUserId: string | null;
  expoPushNotificationToken: string;
}
export type PublicUserChatDetailsListResponse = Response<
  Array<PublicUserChatDetails>
>;

export enum UserStatus {
  active = 'active',
  archived = 'archived',
  anonymized = 'anonymized',
}

export enum SortByColumn {
  name = 'first_name',
  date = 'created_at',
}
export interface GetMemberListRequest {
  status: UserStatus;
  sortedByColumn: SortByColumn;
  order: OrderType;
  page: number;
  per_page?: number;
}

export interface UserMember {
  id: number;
  locations: Array<Location>;
  professions: Array<Profession>;
  language: Language;
  roles: Array<MemberRole>;
  avatars: ResponsiveMediaSizes;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  status: number;
  createdAt: number;
}

export type MembersResponse =  {
  data: Array<UserMember>;
  meta: PaginatedResponseMeta;
};;

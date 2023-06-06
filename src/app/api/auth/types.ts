import { ResponsiveMediaSizes, Response, ResponsiveObject } from '../types';

import { Role } from './constants';

export interface LoginUserDataProps {
  username: string;
  password: string;
}

export interface TokenResponseProps {
  tokenTyp: 'Bearer';
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface Tenant {
  name: string;
  fqdn: string;
  tenant_logo?: string;
  tenant_background_image?: string;
  tenant_favicon?: string;
}

export type TenantResponse = Response<Array<Tenant>>;

export interface PasswordResetResponse {
  msg: string;
  sent: boolean;
}

export interface Location {
  id: number;
  name: string;
  parentId: number;
  slug: string;
  type: string;
  typeName: string;
  typeNameTranslated: string;
}

export interface Profession {
  id: number;
  isSystem: boolean;
  name: string;
  slug: Role | string;
}

export interface Reward {
  typeId: number;
  amount: number;
}

export interface Language {
  id: number;
  code: string;
  name: string;
}

export interface Permission {
  id: number;
  name: string;
  guardName: string;
}

export interface MemberRole {
  id: number;
  name: string;
  permissions: Array<Permission>;
}

export type ComplaintObjectStatus = 'blocked' | 'hidden' | 'none';
export interface Complaints {
  chatMessage: Record<ComplaintObjectStatus, number[]>;
  mission: Record<ComplaintObjectStatus, number[]>;
  missionComment: Record<ComplaintObjectStatus, number[]>;
  newsFeed: Record<ComplaintObjectStatus, number[]>;
  newsFeedComment: Record<ComplaintObjectStatus, number[]>;
  socialFeed: Record<ComplaintObjectStatus, number[]>;
  socialFeedComment: Record<ComplaintObjectStatus, number[]>;
  user: Record<ComplaintObjectStatus, number[]>;
}

export interface UserProfile {
  id: number;
  name: string;
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
  messengerAuthToken: string;
  messengerUserId: string;
  phone: string;
  profession: Profession;
  rewards: Array<Reward>;
  systemLanguage: {
    current: Language;
    languages: Array<Language>;
  };
  contentLanguage: {
    current: Language;
    languages: Array<Language>;
    uiLanguage: string;
  };
  token: string;
  walkthroughPages: Array<string>;
  websiteId: number;
  isAdmin: boolean;
  permissions: {
    modules: {
      articles: Array<string>;
      advancedDashboard: Array<string>;
      connectAccess: boolean;
    };
  };
  complaints: Complaints;
  translationLanguage: string;
}

export type UserProfileResponse = Response<UserProfile>;

export interface Badge {
  configId: number;
  id: number | null;
  updatedAt: null | string;
  progress: number | null;
  contentImage?: ResponsiveMediaSizes;
  contentImageResponsive?: ResponsiveObject;
  title: string;
  howToObtain: string;
  howObtained: string;
  icon: ResponsiveMediaSizes;
  iconResponsive: ResponsiveObject;
  locationId?: number;
  locationName?: string;
  markdown?: boolean;
}

export type BadgesResponse = Response<Array<Badge>>;

export interface UpdateProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  translation_language: string;
}

export interface UpdateProfileResponse {
  status: boolean;
}

export interface UpdatePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ProfilePictureUpdateData extends FormData {
  image: File;
}

export interface UpdatePasswordResponse {
  status: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ValidateEmailTokenRequest {
  email: string;
  token: string;
}

export interface ValidateEmailTokenResponse {
  resetToken: string;
}

export interface ChangePasswordRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface SingleModule {
  // Response contains more data, but we do not consume any of it
  enabled: boolean;
}

export interface EnabledModules {
  kpiDashboard: SingleModule;
  missions: SingleModule;
  news: SingleModule;
  social: SingleModule;
  vmGuides: SingleModule;
}

export type EnabledModulesResponse = Response<EnabledModules>;

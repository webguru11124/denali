import { Profession, Location } from '../auth/types';
import { PaginatedResponse, ResponsiveMediaSizes } from '../types';
import { PublicUserProfile } from '../user/types';

export interface Audience {
  id: number;
  name: string;
  locations: Array<Location>;
  professions: Array<Profession>;
  users: Array<AudienceUser>;
  createdAt: string;
  updatedAt: string;
  updatedBy: UpdatedBy | null;
  usersCount: number | null;
}

export interface UpdatedBy {
  id: number;
  avatars: ResponsiveMediaSizes;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  locations: Array<Location>;
  professions: Array<Profession>;
  timezone: string;
  primaryLocation: Location;
}

export interface AudienceUser
  extends Pick<PublicUserProfile, 'id' | 'avatars' | 'email'> {
  fullName: string;
  timezone: string;
  professions: Array<Profession>;
  locations: Array<Location>;
  primaryLocation: Location;
}

export interface ProfessionLocationUser
  extends Pick<PublicUserProfile, 'id' | 'avatars' | 'email'> {
  fullName: string;
  location: Location;
  profession: Profession;
}

export type AudiencesResponse = PaginatedResponse<Array<Audience>>;
export type AudienceUsersResponse = PaginatedResponse<Array<AudienceUser>>;

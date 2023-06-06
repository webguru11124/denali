import {
  Response,
  PaginatedResponse,
  ResponsiveMediaSizes,
  ApiFile,
} from '../types';

import { CompletionStatus, ActivityStatus, Repeatable } from './constants';

export interface MissionTag {
  id: number;
  name: string;
}

export type MissionTagResponse = Response<Array<MissionTag>>;

export interface Reward {
  typeId: number;
  amount: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface LogoResponsive {
  fileName: string;
  id: number;
  mimeType: string;
  name: string;
  sizes: ResponsiveMediaSizes | null;
  transcodedVideo: null;
  type: 'image';
  url: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  logo: string;
  logoResponsive: LogoResponsive | null;
  totalActivities: number;
  completedActivities: number;
  rewards: Array<Reward>;
  tags: Array<Tag>;
  category: MissionTag | null;
  files: Array<File>;
}

export type MissionsResponse = PaginatedResponse<Array<Mission>>;

export interface LastUser {
  id: number;
  fullName: string;
  avatars: ResponsiveMediaSizes;
}

export interface CompletedBy {
  lastUsers: Array<LastUser>;
  count: number;
}

export interface SeriesActivity {
  id: number;
  comments: number;
  completed: ActivityStatus;
  completedBy: CompletedBy;
  files: Array<ApiFile>;
  name: string;
  order: number;
  repeatable: Repeatable;
  rewards: Array<Reward>;
  typeId: number;
  userCount: number;
  logo: LogoResponsive;
}

export interface Series {
  id: number;
  name: string;
  description: string;
  order: number;
  markdown: boolean;
  activities: Array<SeriesActivity>;
  totalActivities: number;
  completedActivities: number;
  rewards: Array<Reward>;
  totalRewards: Array<Reward>;
}

export interface SingleMission {
  id: number;
  name: string;
  description: string;
  series: Array<Series>;
  rewards: Array<Reward>;
  totalRewards: Array<Reward>;
  logo: string;
  markdown: boolean;
  logoResponsive: LogoResponsive;
  tags: Array<Tag>;
  category: null;
  files: Array<ApiFile>;
}

export interface PreMappedSeriesActivity {
  id: number;
  comments: number;
  completed: ActivityStatus;
  completed_by: CompletedBy;
  files: Array<ApiFile>;
  name: string;
  order: number;
  repeatable: Repeatable;
  rewards: Array<Reward>;
  typeId: number;
  user_count: number;
  logo: LogoResponsive;
}

export interface PreMappedSeries {
  id: number;
  name: string;
  description: string;
  order: number;
  markdown: boolean;
  activities: Array<PreMappedSeriesActivity>;
  total_activities: number;
  completed_activities: number;
  rewards: Array<Reward>;
  total_rewards: Array<Reward>;
}

export interface PreMappedSingleMission {
  id: number;
  name: string;
  description: string;
  series: Array<PreMappedSeries>;
  rewards: Array<Reward>;
  total_rewards: Array<Reward>;
  logo: string;
  markdown: boolean;
  logo_responsive: LogoResponsive;
  tags: Array<Tag>;
  category: null;
  files: Array<ApiFile>;
}

export type SingleMissionResponse = Response<SingleMission>;

export interface MissionReportFile {
  id: number;
  url: string;
  createdAt: string;
}

export interface MissionStats {
  id: number;
  name: string;
  logo: string;
  logoResponsive: ResponsiveMediaSizes;
  locationName: string;
  inProgress: number;
  completed: number;
  notStarted: number;
  totalUsers: number;
  activitiesCount: number;
  files?: Array<MissionReportFile>;
}

export type MissionStatsResponse = Response<MissionStats>;

export interface MissionLocationStats {
  id: number;
  name: string;
  userCount: number;
  totalCompleted: number;
  totalStarted: number;
  totalNotStarted: number;
}

export type MissionLocationsStatsResponse = PaginatedResponse<
  Array<MissionLocationStats>
>;

export interface UserMissionStats {
  avatars: ResponsiveMediaSizes;
  completedActivities: number;
  id: number;
  userName: string;
}

export type UserMissionStatsResponse = PaginatedResponse<
  Array<UserMissionStats>
>;

export interface MissionReport {
  files: Array<MissionReportFile>;
  id: number;
}

export type MissionReportResponse = Response<MissionReport>;

export interface BaseActivityAnswer {
  files: Array<ApiFile>;
  text: string;
}

export interface QuizAnswer {
  uuid: string;
  answer: string;
  correct: boolean;
}

export interface Activity {
  id: number;
  name: string;
  markdown: boolean;
  order: number;
  completed: ActivityStatus;
  repeatable: Repeatable;
  comments: number;
  nextId?: number;
  typeId: number;
  missionId: number;
  loop: boolean;
  userCount: number;
  rewards: Array<Reward>;
  completedBy: CompletedBy;
  files: Array<ApiFile>;
  logoResponsive?: LogoResponsive;
  totalActivities: number;
  completedActivities: number;
  content: string;
  answers: Array<QuizAnswer>;
  logo: string;
  userAnswer: BaseActivityAnswer | [];
}

export type ActivityResponse = Response<Activity>;

export interface ActivityAnswer {
  timeAgo: string;
  files: Array<LogoResponsive>;
  id: number;
  answer: string;
  user: {
    avatars: ResponsiveMediaSizes;
    fullname: string;
    userId: number;
  };
}

export interface PreMappedQuizAnswer {
  uuid: string;
  answer: string;
  correct: '0' | '1';
}

export interface PreMappedQuizContent {
  answers: {
    [key: string]: Array<PreMappedQuizAnswer>;
  };
  question: string;
}

export interface PreMappedActivity {
  id: number;
  name: string;
  markdown: boolean;
  order: number;
  completed: ActivityStatus;
  repeatable: Repeatable;
  comments: number;
  next_id?: number;
  type_id: number;
  mission_id: number;
  loop: boolean;
  user_count: number;
  rewards: Array<Reward>;
  completed_by: CompletedBy;
  files: Array<LogoResponsive>;
  logo_responsive?: LogoResponsive;
  total_activities: number;
  completed_activities: number;
  content: string | PreMappedQuizContent;
  answers: string;
  logo: string;
  user_answer: BaseActivityAnswer | [];
}

export type ActivityAnswersResponse = Response<Array<ActivityAnswer>>;

export interface QuizStatsItem {
  answer: string;
  selected: boolean;
  total: number;
  uuid: string;
}

export interface QuizStats {
  answers: Array<QuizStatsItem>;
}

export type QuizStatsResponse = Response<QuizStats>;

export interface LoopedQuizStats {
  answers: { [key: string]: { count: number } };
}

export type LoopedQuizStatsResponse = Response<LoopedQuizStats>;

export interface MissionsRequestData {
  page: number;
  perPage: number;
  query: string;
  tags: Array<string>;
}

export interface UserStatsByLocation {
  activitiesCount: number;
  completed: number;
  id: number;
  locationName: string;
  logo: string;
  logoResponsive: string | null;
  name: string;
  notStarted: number;
  totalUsers: number;
}

export type UserStatsByLocationResponse = Response<UserStatsByLocation>;

export interface GetUserStatsRequest {
  id: number;
  status: CompletionStatus | '';
  query: string;
  page: number;
  perPage: number;
  locationId?: string;
}

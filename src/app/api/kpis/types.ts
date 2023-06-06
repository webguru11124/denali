import { Response, ResponsiveMediaSizes } from '../types';

import {
  DateRange as DateRangeEnum,
  InteractiveDisplayMode,
  ChartType,
  SummaryMode,
} from './constants';

export interface LocationType {
  id: number;
  name: string;
  parentId: number | null;
  type: string;
  typeName: string;
  typeNameTranslated: string;
  slug: string;
}

export interface KeyByLocation {
  [key: string]: Array<LocationType>;
}

export type LocationResponse = Response<Array<LocationType>>;

export interface GetSummariesRequest {
  dateFrom?: number;
  dateTo?: number;
  locationId?: number;
  userId?: number;
  selectedUserLocation?: boolean;
}

export interface GetRankingsRequest {
  type: string;
  dateFrom?: number;
  dateTo?: number;
  locationId?: number;
}

export interface DateRange {
  id: number;
  name: string;
  slug: DateRangeEnum;
  default: boolean;
}

export type CalendarDateRange = [Date | null, Date | null];
export type CalendarDate = Date | CalendarDateRange;

export type DatesRangesResponse = Response<Array<DateRange>>;

export interface User {
  id: number;
  fullName: string;
  avatars: ResponsiveMediaSizes;
  location: LocationType;
}

export interface SummaryData {
  target: number;
  total: number;
}

export interface Summary {
  data: SummaryData;
  type: string;
  total: number;
  updatedAt?: string;
  settings: ChartSettings;
}

export interface ColorStyles {
  background: string;
  color: string;
}

export interface ChartOptions {
  chart: {
    type: ChartType;
  };
}

export interface KpiValueFormat {
  appendUnit: string | null;
  prependUnit: string | null;
  decimalsCount: number;
  decimalsSeperator: string;
  thousandsSeperator: string;
}

export interface ChartSettings {
  title: string;
  subtitle: string;
  isPublished: boolean;
  order: number;
  colorStyles: ColorStyles;
  image: string;
  interactiveMode: InteractiveDisplayMode;
  summaryOptions: SummaryOptions;
  chartOptions: ChartOptions;
  kpiValueFormat?: KpiValueFormat;
}

export interface SummaryOptions {
  primaryName: string;
  secondaryName?: string;
  mode: SummaryMode;
  primaryCount: number;
  secondaryCount?: number;
  checkPointAt?: number;
  colorStyles: ColorStyles;
  scoreboardEnabled?: boolean;
}

export interface Summaries {
  location?: LocationType;
  user?: User;
  summaries: Array<Summary>;
  hideLocationTree?: boolean;
}

export type SummariesResponse = Response<Summaries>;

export interface GetChartRequest {
  type: string;
  dateFrom?: number;
  dateTo?: number;
  userId?: number;
  locationId?: number;
}

export interface Chart {
  settings: ChartSettings;
  type: ChartType;
  xAxis: Array<string>;
  yAxis: Array<Array<number>>;
  legendValues: Array<number>;
}

export interface ChartData {
  location?: LocationType;
  user?: User;
  chart: Chart;
  updatedAt?: string;
}

export interface ChartLocation {
  id: number;
  name: string;
  total: number;
}
export interface ChartLocations {
  location: LocationType;
  locations: Array<ChartLocation>;
  settings?: {
    kpiValueFormat?: KpiValueFormat;
  };
}

export type ChartLocationsResponse = Response<ChartLocations>;

export interface GetChartLocationsRequest {
  handle: string;
  dateFrom?: number;
  dateTo?: number;
  locationId?: number;
}

export type ChartResponse = Response<ChartData>;

export interface RankingUser {
  id: number;
  fullName: string;
  avatars: ResponsiveMediaSizes;
  total: number;
}

export interface Ranking {
  daysLeft: number;
  from: string;
  to: string;
  location: Location;
  locations?: Array<ChartLocation>;
  users?: Array<RankingUser>;
  updatedAt: string;
}

export type RankingsResponse = Response<Ranking>;

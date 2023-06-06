import {
  GetChartRequest,
  GetSummariesRequest,
  GetChartLocationsRequest,
  GetRankingsRequest,
} from './types';

export default {
  getLocations: () => ['kpis-locations'],
  getDatesRanges: () => ['kpis-dates-ranges'],
  getChart: ({
    type,
    dateFrom,
    dateTo,
    userId,
    locationId,
  }: GetChartRequest) => [
    'kpis-chart',
    type,
    dateFrom,
    dateTo,
    userId,
    locationId,
  ],
  getSummaries: ({
    dateFrom,
    dateTo,
    locationId,
    userId,
    selectedUserLocation,
  }: GetSummariesRequest) => [
    'kpis-summaries',
    dateFrom,
    dateTo,
    locationId,
    userId,
    selectedUserLocation,
  ],
  getKpisChartLocations: ({
    handle,
    dateFrom,
    dateTo,
    locationId,
  }: GetChartLocationsRequest) => [
    'kpis-chart-locations',
    handle,
    dateFrom,
    dateTo,
    locationId,
  ],
  getRankings: ({ type, dateFrom, dateTo, locationId }: GetRankingsRequest) => [
    'kpis-rankings',
    type,
    dateFrom,
    dateTo,
    locationId,
  ],
};

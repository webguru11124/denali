import camelcaseKeys from 'camelcase-keys';

import { Response } from '../../types';
import { ActivityStatus } from '../constants';
import {
  PreMappedSingleMission,
  SingleMission,
  SeriesActivity,
  Series,
} from '../types';

const mapActivities = (
  activities: Array<SeriesActivity>,
  isPrevSeriesCompleted: boolean
) => {
  const getStatus = (status: ActivityStatus, index: number) => {
    // If current activity is locked, but the one before is unlocked
    // mark activity as active
    if (
      status === ActivityStatus.locked &&
      activities[index - 1]?.completed === ActivityStatus.completed
    ) {
      return ActivityStatus.active;
    }

    // If its the first activity of series and previous series is completed
    // mark activity as active
    if (
      isPrevSeriesCompleted &&
      index === 0 &&
      status === ActivityStatus.locked
    ) {
      return ActivityStatus.active;
    }

    return status;
  };
  return activities.map(({ completed, ...activity }, index) => ({
    ...activity,
    completed: getStatus(completed, index),
  }));
};

const mapSeries = (series: Array<Series>) => {
  let isPrevSeriesCompleted = true;
  return series.map((singleSeries, index) => {
    if (index !== 0) {
      const prevIndex = index - 1;
      isPrevSeriesCompleted =
        series[prevIndex].completedActivities ===
        series[prevIndex].totalActivities;
    }

    return {
      ...singleSeries,
      activities: mapActivities(singleSeries.activities, isPrevSeriesCompleted),
    };
  });
};

const mapMission = (
  data: Response<PreMappedSingleMission> | Response<SingleMission>
) => {
  const camelCasedData: Response<SingleMission> = camelcaseKeys(data, {
    deep: true,
  });

  return {
    ...camelCasedData,
    data: {
      ...camelCasedData.data,
      series: mapSeries(camelCasedData.data.series),
    },
  };
};

export default mapMission;

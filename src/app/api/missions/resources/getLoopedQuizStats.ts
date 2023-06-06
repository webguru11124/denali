import { request } from '../../request';
import { LoopedQuizStatsResponse } from '../types';

const getLoopedQuizStats = (activityId: number) =>
  request().get<LoopedQuizStatsResponse>(
    `/api/v1/activities/${activityId}/answers/loopStats`
  );

export default getLoopedQuizStats;

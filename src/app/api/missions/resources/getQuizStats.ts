import { request } from '../../request';
import { QuizStatsResponse } from '../types';

const getQuizStats = (id: number) =>
  request().get<QuizStatsResponse>(`/api/v1/activities/${id}/answers/stats`);

export default getQuizStats;

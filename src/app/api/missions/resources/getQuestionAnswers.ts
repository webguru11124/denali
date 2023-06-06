import { request } from '../../request';
import { ActivityAnswersResponse } from '../types';

const getQuestionAnswers = (id: number) =>
  request().get<ActivityAnswersResponse>(`/api/v1/activities/${id}/answers`);

export default getQuestionAnswers;

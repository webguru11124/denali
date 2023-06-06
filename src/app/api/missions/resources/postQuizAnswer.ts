import { request } from '../../request';

const postQuizAnswer = (id: number, ids: Array<string>) =>
  request().post(`/api/v1/activities/${id}/answers`, {
    ids,
  });

export default postQuizAnswer;

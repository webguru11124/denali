import { request } from '../../request';

const postQuizAnswerIncorrect = (
  activityId: number,
  answerIds: Array<string>
) =>
  request().post(`/api/v1/activities/${activityId}/incorrect`, {
    ids: answerIds,
  });

export default postQuizAnswerIncorrect;

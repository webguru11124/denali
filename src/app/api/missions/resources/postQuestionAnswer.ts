import { request } from '../../request';

interface Data {
  answer: string;
}

const postQuestionAnswer = (id: number, data: Data) =>
  request().post(`/api/v1/activities/${id}/answers`, data);

export default postQuestionAnswer;

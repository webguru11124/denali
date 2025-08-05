import { types } from 'app/api/missions';

const getCorrectAnswers = (answers: Array<types.QuizAnswer>) =>
  answers.filter(({ correct }) => correct);

export default getCorrectAnswers;

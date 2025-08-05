import { types } from 'app/api/missions';

import getCorrectAnswers from './getCorrectAnswers';

const isAnsweredCorrect = (
  answers: Array<types.QuizAnswer>,
  selectedAnswers: Array<string>
) => {
  const correctAnswers = getCorrectAnswers(answers);
  return (
    correctAnswers.filter(({ uuid }) => selectedAnswers.includes(uuid))
      .length === correctAnswers.length
  );
};

export default isAnsweredCorrect;

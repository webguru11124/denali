import { Response } from '../../types';
import { ActivityTypes } from '../constants';
import { PreMappedQuizAnswer, PreMappedActivity } from '../types';

const mapActivity = (activity: Response<PreMappedActivity>) => {
  if (activity.data.type_id !== ActivityTypes.quiz) {
    return {
      ...activity,
      data: {
        ...activity.data,
        answers: [],
      },
    };
  }
  const { content } = activity.data;
  // Declaring as type other than `any` throws typescript error
  const question = (content as any).question as string;
  const answers = (content as any).answers as {
    [key: string]: Array<PreMappedQuizAnswer>;
  };
  return {
    ...activity,
    data: {
      ...activity.data,
      content: question,
      answers:
        Object.values(answers)?.[0]?.map(
          ({ correct, ...answer }: PreMappedQuizAnswer) => ({
            ...answer,
            correct: correct === '1',
          })
        ) || [],
    },
  };
};

export default mapActivity;

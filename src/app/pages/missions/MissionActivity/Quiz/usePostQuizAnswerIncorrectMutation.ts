import { resources } from 'app/api/missions';
import { useMutation } from 'react-query';

const usePostQuizAnswerMutation = (id: number) => {
  const { mutate, isLoading, isError } = useMutation((ids: Array<string>) =>
    resources.postQuizAnswerIncorrect(id, ids)
  );

  return { mutate, isLoading, isError };
};

export default usePostQuizAnswerMutation;

import { queryKeys, resources } from 'app/api/missions';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const useQuestionAnswersQuery = (id: number) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getQuestionAnswers(id),
    () => resources.getQuestionAnswers(id)
  );

  return {
    data: selectData(data),
    isLoading,
    isError,
  };
};

export default useQuestionAnswersQuery;

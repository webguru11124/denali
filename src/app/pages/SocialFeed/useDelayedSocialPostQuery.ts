import { resources, queryKeys } from 'app/api/socialFeed';
import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

const DELAY_ID = -1;

const useSocialPostQuery = (postId: number | undefined = DELAY_ID) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getSocialPost(postId),
    () => resources.getSocialPost(postId),
    {
      enabled: postId !== DELAY_ID,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useSocialPostQuery;

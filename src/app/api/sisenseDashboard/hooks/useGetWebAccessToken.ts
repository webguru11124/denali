import { selectSisenseData } from 'app/utils';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import queryKeys from '../queryKeys';
import getWebAccessToken from '../resources/getWebAccessToken';


const useGetWebAccessToken = () => {

  const { data, isLoading, isError } = useQuery(
    queryKeys.getWebAccessToken(),
    getWebAccessToken,
  );

  const wat = useMemo(() => selectSisenseData(data), [data]);

  return {wat, isLoading, isError}
}

export default useGetWebAccessToken;
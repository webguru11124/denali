import { selectSisenseData } from 'app/utils';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import queryKeys from '../queryKeys';
import getSisenseList from '../resources/getSisenseList';


const useGetSisenseListQuery = ({enabled}: {enabled?: boolean;}) => {

  const { data, isLoading, isError } = useQuery(
    queryKeys.getSisenseList(),
    getSisenseList,
    {
      enabled
    }
  );

  const sisenseList = useMemo(() => selectSisenseData(data), [data]);

  return {sisenseList, isLoading, isError}
}

export default useGetSisenseListQuery;
import { PaginatedResponse } from 'app/api/types';
import { reducePages } from 'app/utils';
import { AxiosResponse } from 'axios';
import { InfiniteData } from 'react-query';

type Data = InfiniteData<AxiosResponse<PaginatedResponse<any>>>;

const getTotalAmountFromPaginatedResponse = (data: Data): number => {
  const reducedData = reducePages(data);

  return reducedData?.meta?.total || 0;
};

export default getTotalAmountFromPaginatedResponse;

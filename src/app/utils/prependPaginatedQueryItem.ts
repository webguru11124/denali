import { types } from 'app/api';
import { AxiosResponse } from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { InfiniteData } from 'react-query';

const prependPaginatedQueryItem = <T extends Array<any>>(
  original: InfiniteData<AxiosResponse<types.PaginatedResponse<T>>>,
  update: any
): InfiniteData<AxiosResponse<any>> => {
  const clonedOriginal = cloneDeep(original);
  clonedOriginal?.pages?.[0]?.data?.data?.unshift(update);

  return clonedOriginal;
};

export default prependPaginatedQueryItem;

import { types } from 'app/api';
import { AxiosResponse } from 'axios';
import { InfiniteData } from 'react-query';

interface ReducedData<T> {
  data: Array<T>;
  meta: types.PaginatedResponseMeta;
}

const reducePages = <T>(
  data:
    | InfiniteData<AxiosResponse<types.PaginatedResponse<Array<T>>>>
    | undefined
): ReducedData<T> | null => {
  if (!data) return null;
  const { pages } = data;
  const defaultData: Array<T> = [];
  return {
    data: pages.reduce((acc, page) => [...acc, ...page.data.data], defaultData),
    meta: pages[pages.length - 1].data.meta,
  };
};

export default reducePages;

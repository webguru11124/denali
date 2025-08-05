import { AxiosResponse } from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { InfiniteData } from 'react-query';

type MapPaginatedQuery = <T>(
  query: InfiniteData<AxiosResponse>,
  callback: (item: T) => boolean
) => InfiniteData<AxiosResponse>;

const mapPaginatedQuery: MapPaginatedQuery = (query, callback) => {
  // clone object to prevent mutating original
  const clonedQuery = cloneDeep(query);

  return {
    ...clonedQuery,
    pages: clonedQuery.pages.map((page: any) => ({
      ...page,
      data: {
        ...page.data,
        // Map data
        data: page.data.data.filter(callback),
      },
    })),
  };
};

export default mapPaginatedQuery;

import { getArticles, RawWikiResponse } from 'common-ui/api/clients/wikiClient';

import { createCustomInstance } from '../../request';

const defaultParams = {
  page: 1,
  query: '',
  perPage: 20,
};

const getWiki = (params = defaultParams) =>
  getArticles(
    ({ path, query }) =>
      createCustomInstance({ disableCamelCaseConversion: true })
        .request<RawWikiResponse>({
          method: 'GET',
          url: path,
          params: query,
        })
        .then((response) => response.data),
    {
      // we can ignore content language and token since these fields
      // are already set inside of request()
      contentLanguage: '',
      token: '',
      count: params.perPage,
      pageIndex: params.page - 1,
      query: params.query,
    }
  );

export default getWiki;

import {
  BaseRequest,
  HttpGet,
  PagedResponse,
  RawPagedResponse,
} from '../commonTypes/mainApiCommonTypes';

const getArticles = <T extends Promise<RawWikiResponse>>(
  httpGet: HttpGet<T>,
  request: WikiRequest
) => {
  const rawResponse = httpGet({
    path: 'api/v2/wikiPages',
    headers: {
      authorization: `Bearer ${request.token}`,
      'content-language': request.contentLanguage,
    },
    query: {
      per_page: request.count,
      page: request.pageIndex + 1,
      query: request.query ?? '',
    },
  });

  // TODO: use camelcase-keys instead
  // Currently it seems that camelcase-keys library
  // throws and error "No identifiers allowed directly after numeric literal"
  // It works in web project...
  return rawResponse.then<WikiResponse>(
    ({
      data,
      links,
      meta: { current_page, from, last_page, path, per_page, to, total },
    }) => {
      return {
        data: data.map<Wiki>(
          ({
            childCount,
            excerpt,
            hasChild,
            icon_sizes,
            id,
            markdown,
            title,
            icon,
          }) => ({
            childCount,
            excerpt,
            hasChild,
            id,
            markdown,
            title,
            icon,
            iconSizes: icon_sizes
              ? {
                  extraLarge: icon_sizes.extra_large,
                  large: icon_sizes.large,
                  medium: icon_sizes.medium,
                  small: icon_sizes.small,
                }
              : null,
          })
        ),
        links: { ...links },
        meta: {
          currentPage: current_page,
          from,
          lastPage: last_page,
          path,
          perPage: per_page,
          to,
          total,
        },
      };
    }
  );
};

interface WikiRequest extends BaseRequest {
  count: number;
  pageIndex: number;
  query?: string;
}

interface RawWiki {
  id: number;
  title: string;
  excerpt: string;
  icon?: string;
  hasChild: boolean;
  markdown: boolean;
  childCount: number;
  icon_sizes: {
    extra_large: string;
    large: string;
    medium: string;
    small: string;
  } | null;
}

interface Wiki {
  id: number;
  title: string;
  excerpt: string;
  icon?: string;
  hasChild: boolean;
  markdown: boolean;
  childCount: number;
  iconSizes?: {
    extraLarge: string;
    large: string;
    medium: string;
    small: string;
  } | null;
}

type RawWikiResponse = RawPagedResponse<RawWiki[]>;
type WikiResponse = PagedResponse<Wiki[]>;

export type { WikiRequest, WikiResponse, RawWikiResponse };
export { getArticles };

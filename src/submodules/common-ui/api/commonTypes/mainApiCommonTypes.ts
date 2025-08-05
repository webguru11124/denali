interface BaseRequest {
  token: string;
  contentLanguage: string;
}

interface RawSimpleResponse<T> {
  data: T;
}

interface RawPagedResponse<T> extends RawSimpleResponse<T> {
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

interface SimpleResponse<T> {
  data: T;
}

interface PagedResponse<T> extends SimpleResponse<T> {
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    currentPage: number;
    from: number;
    lastPage: number;
    path: string;
    perPage: number;
    to: number;
    total: number;
  };
}

type HttpGet<PromiseType extends Promise<any>> = (params: {
  path: string;
  query?: Record<string, string | number>;
  headers: Record<string, string>;
}) => PromiseType;

type HttpPost<PromiseType extends Promise<any>> = (params: {
  path: string;
  body?: Record<string, any>;
  headers: Record<string, string>;
}) => PromiseType;

export type {
  RawSimpleResponse,
  RawPagedResponse,
  PagedResponse,
  SimpleResponse,
  BaseRequest,
  HttpGet,
  HttpPost,
};

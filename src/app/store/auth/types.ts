export interface Tenant {
  url: string;
  logo?: string;
  alias: string;
}

export interface State {
  token: null | string;
  idToken: null | string;
  selectedTenant: null | Tenant;
  tenants: null | Array<Tenant>;
  translationLanguage: null | string;
}

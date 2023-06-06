import config from 'app/config';
import { UserManager } from 'oidc-client';

const createOpenIdManager = (originUrl?: string, isTokenExpired?: boolean) =>
  new UserManager({
    authority: config.env.identityServerUri,
    client_id: config.env.identityServerClientId,
    response_type: 'code',
    redirect_uri: originUrl ?? config.env.identityServerRedirectUri,
    post_logout_redirect_uri: config.env.identityServerRedirectUri,
    scope: config.env.identityServerScopes,
    extraQueryParams: {
      ...(isTokenExpired && {
        errorCode: 401,
      }),
    },
  });

export default createOpenIdManager;

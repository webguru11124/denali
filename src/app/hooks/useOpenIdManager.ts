import clockService from 'app/api/clockService';
import config from 'app/config';
import useTenantsMutation from 'app/pages/Login/useTenantsMutation';
import { actions, selectors } from 'app/store/auth';
import { actions as configActions } from 'app/store/config';
import jwtDecode from 'jwt-decode';
import { UserManager } from 'oidc-client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useUrlQuery from './useUrlQuery';

const useOpenIdManager = () => {
  const dispatch = useDispatch();
  const { mutateAsync: getTenants } = useTenantsMutation();
  const hasCodeParam = useUrlQuery('code');
  const token = useSelector(selectors.getToken);
  const history = useHistory();
  const stateParam = useUrlQuery('state');

  const createOpenIdManager = (originUrl?: string) =>
    new UserManager({
      authority: config.env.identityServerUri,
      client_id: config.env.identityServerClientId,
      response_type: 'code',
      redirect_uri: originUrl ?? config.env.identityServerRedirectUri,
      post_logout_redirect_uri: config.env.identityServerRedirectUri,
      scope: config.env.identityServerScopes,
      clockService: clockService,
    });

  const redirectCallback = async (originUrl?: string) => {
    const existStateInLocalStorage = localStorage.getItem(`oidc.${stateParam}`);

    if (!token && hasCodeParam && existStateInLocalStorage) {
      const openIdManager = createOpenIdManager(originUrl);
      const user = await openIdManager.signinRedirectCallback();

      dispatch(actions.tokenRetrieved(user.access_token));
      dispatch(actions.idTokenRetrieved(user.id_token));

      const { tenant, email }: { email: string; tenant: string } = jwtDecode(
        user.access_token
      );

      const tenantsResponse = await getTenants(email);
      const selectedTenant = tenantsResponse.data.data
        .filter((i) => i.name === tenant)
        .map(({ fqdn, tenant_logo: logo, name }) => ({
          url: `https://${fqdn}`,
          alias: name,
          logo,
        }))[0];
      dispatch(actions.tenantSelected(selectedTenant));
      history.replace({ search: '' });
      dispatch(configActions.stateReset());
    }
  };

  return { redirectCallback };
};

export default useOpenIdManager;

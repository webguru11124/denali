import createOpenIdManager from 'app/api/createOpenIdManager';
import { useSelector, useUrlQuery } from 'app/hooks';
import { routes } from 'app/router';
import { selectors } from 'app/store/auth';
import { selectors as configSelectors } from 'app/store/config';
import { logger } from 'app/utils';
import { FC, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import LoginContext from './LoginContext';

const LoginPasswordIdentityServer: FC = () => {
  const queryEmail = useUrlQuery('email');
  const tenant = useSelector(selectors.getSelectedTenant);
  const isTokenExpired = useSelector(configSelectors.getIsExpiredToken);
  const history = useHistory();
  const { resetSteps } = useContext(LoginContext);
  const originUrl = useSelector(configSelectors.getOriginUrl);

  useEffect(() => {
    createOpenIdManager(originUrl, isTokenExpired)
      .signinRedirect()
      .catch((error) => {
        logger.error(error);
        history.replace({
          pathname: routes.login.create(),
        });
        history.replace(routes.login.create());
        resetSteps();
      });
  }, [queryEmail, tenant, history, resetSteps, originUrl, isTokenExpired]);

  return <div />;
};

export default LoginPasswordIdentityServer;

import { Role } from 'app/api/auth/constants';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { PageLoader } from 'app/components';
import { useDispatch, useSelector, useUrlQuery } from 'app/hooks';
import useOpenIdManager from 'app/hooks/useOpenIdManager';
import { selectors } from 'app/store/auth';
import { actions as configActions } from 'app/store/config';
import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';

import routes from './routes';

interface PrivateRouteProps extends RouteProps {
  accessibleByRoles?: Array<Role>;
}

const DEFAULT_ROUTE = routes.socialFeed.create();

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  accessibleByRoles,
  ...restProps
}) => {
  const { data: user, hasRole } = useAuthenticatedUser();
  const token = useSelector(selectors.getToken);
  const hasCodeParam = useUrlQuery('code');
  const dispatch = useDispatch();

  useOpenIdManager().redirectCallback();

  if (!token) {
    if (!hasCodeParam) {
      const currentUrl = window.location.href;
      dispatch(configActions.originUrlChanged(currentUrl));
      return <Redirect to={routes.login.create()} />;
    }
  }

  if (accessibleByRoles && !user) {
    return null;
  }

  if (accessibleByRoles && user && !hasRole(accessibleByRoles)) {
    return <Redirect to={DEFAULT_ROUTE} />;
  }

  // Wait until we have user data to configure request instance
  if (!user) {
    return <PageLoader />;
  }

  return <Route {...restProps} />;
};

export default PrivateRoute;

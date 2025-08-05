import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import routes from './routes';

const PublicRoute: React.FC<RouteProps> = (props) => {
  const token = useSelector(selectors.getToken);

  if (token) {
    return <Redirect to={routes.socialFeed.create()} />;
  }

  return <Route {...props} />;
};

export default PublicRoute;

import { MANAGER_ROLES } from 'app/api/auth/constants';
import { PageLoader } from 'app/components';
import { AuthenticatedPageLayout } from 'app/layouts';
import ToastContainer from 'app/pages/Editor/components/Toast/ToastContainer';
import React, { Suspense, lazy } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { SaveAlertHandler } from '../handlers';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import routes from './routes';

const LazyChat = lazy(() => import('../pages/Chat'));

const Router: React.FC = () => (
  <HashRouter>
    <SaveAlertHandler />
    <Suspense fallback={<PageLoader />}>
      <div className="flex">
        <Switch>
          <Route
            exact
            path={routes.nikeSkuRedirect.value}
            component={lazy(() => import('../pages/NikeSKURedirect'))}
          />
          {/* Public routes */}
          <PublicRoute
            exact
            path={routes.login.value}
            component={lazy(() => import('../pages/Login'))}
          />
          <PublicRoute
            exact
            path={routes.resetPassword.value}
            component={lazy(() => import('../pages/PasswordResetSuccess'))}
          />
          <Route
            path="/404"
            component={lazy(() => import('../pages/PageNotFound'))}
          />

          {/* Private routes */}

          <AuthenticatedPageLayout>
            <Suspense fallback={null}>
              <Switch>
                <PrivateRoute
                  exact
                  path={routes.articleStudio.value}
                  component={lazy(() => import('../pages/Articles'))}
                />
                <PrivateRoute
                  exact
                  path={routes.editor.value}
                  component={lazy(() => import('../pages/Editor'))}
                />
                <PrivateRoute
                  exact
                  path={routes.editorArticle.value}
                  component={lazy(() => import('../pages/Editor'))}
                />
                <PrivateRoute
                  exact
                  path={routes.audiences.value}
                  component={lazy(() => import('../pages/Audiences/Audiences'))}
                />
                <PrivateRoute
                  exact
                  path={routes.audience.value}
                  component={lazy(() => import('../pages/Audience/Audience'))}
                />
                <PrivateRoute
                  exact
                  path={routes.channels.value}
                  component={lazy(() => import('../pages/Channels'))}
                />
                <PrivateRoute
                  exact
                  path={routes.advancedDashboard.value}
                  component={lazy(
                    () => import('../pages/AdvancedDashboard/AdvancedDashboard')
                  )}
                />
                <PrivateRoute
                  exact
                  path={routes.newsFeed.value}
                  component={lazy(() => import('../pages/NewsFeed'))}
                />
                <PrivateRoute
                  exact
                  path={routes.wiki.value}
                  component={lazy(() => import('../pages/wiki/WikiLanding'))}
                />
                <PrivateRoute
                  exact
                  path={routes.newsArticle.value}
                  component={lazy(() => import('../pages/NewsArticle'))}
                />
                <PrivateRoute
                  exact
                  path={routes.wikiArticle.value}
                  component={lazy(() => import('../pages/wiki/WikiArticle'))}
                />
                <PrivateRoute
                  exact
                  path={routes.profile.value}
                  component={lazy(
                    () => import('../pages/profiles/PrivateProfile')
                  )}
                />
                <PrivateRoute
                  exact
                  path={routes.missions.value}
                  component={lazy(() => import('../pages/missions/Missions'))}
                />
                <PrivateRoute
                  exact
                  path={routes.missionsList.value}
                  component={lazy(
                    () => import('../pages/missions/MissionsList')
                  )}
                />
                <PrivateRoute
                  exact
                  path={routes.mission.value}
                  component={lazy(() => import('../pages/missions/Mission'))}
                />
                <PrivateRoute
                  exact
                  path={routes.missionReport.value}
                  component={lazy(
                    () => import('../pages/missions/MissionReport')
                  )}
                />
                <PrivateRoute
                  exact
                  path={routes.missionActivity.value}
                  component={lazy(
                    () => import('../pages/missions/MissionActivity')
                  )}
                />
                <PrivateRoute
                  exact
                  path={routes.socialFeed.value}
                  component={lazy(() => import('../pages/SocialFeed'))}
                />
                <PrivateRoute
                  exact
                  path={routes.user.value}
                  component={lazy(
                    () => import('../pages/profiles/PublicProfile')
                  )}
                />
                <PrivateRoute
                  exact
                  path={routes.visualGuides.value}
                  component={lazy(() => import('../pages/VisualGuides'))}
                />
                <PrivateRoute
                  exact
                  path={routes.visualGuide.value}
                  component={lazy(() => import('../pages/VisualGuide'))}
                />
                <PrivateRoute
                  exact
                  path={routes.kpis.value}
                  component={lazy(() => import('../pages/kpis/Dashboard'))}
                />

                <PrivateRoute
                  exact
                  path={routes.kpi.value}
                  component={lazy(() => import('../pages/kpis/Kpi'))}
                />

                <PrivateRoute
                  exact
                  path={routes.kpiRankings.value}
                  accessibleByRoles={MANAGER_ROLES}
                  component={lazy(() => import('../pages/kpis/Rankings'))}
                />
                <PrivateRoute
                  exact
                  path={routes.notifications.value}
                  component={lazy(() => import('../pages/Notifications'))}
                />
                <PrivateRoute
                  exact
                  path={routes.atticusRedirect.value}
                  component={lazy(() => import('../pages/AtticusRedirect'))}
                />
                <PrivateRoute
                  exact
                  path={routes.members.value}
                  component={lazy(() => import('../pages/Members'))}
                />
                <PrivateRoute path={routes.chat.value} component={LazyChat} />
                <PrivateRoute
                  exact
                  path={routes.channel.value}
                  component={lazy(() => import('../pages/ChannelView'))}
                />
                <Redirect to="/404" />
              </Switch>
            </Suspense>
          </AuthenticatedPageLayout>
          <Redirect to="/404" />
        </Switch>
      </div>
    </Suspense>
    <ToastContainer toastId="ArticleRejection" />
  </HashRouter>
);
export default Router;

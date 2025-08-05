import DefaultBreadcrumb from 'app/components/Breadcrumbs/DefaultBreadcrumb';
import KPIBreadcrumb from 'app/components/Breadcrumbs/KPIBreadcrumb';
import MissionActivityBreadcrumb from 'app/components/Breadcrumbs/MissionActivityBreadcrumb';
import MissionBreadcrumb from 'app/components/Breadcrumbs/MissionBreadcrumb';
import MissionReportBreadcrumb from 'app/components/Breadcrumbs/MissionReportBreadcrumb';
import MissionsListBreadcrumb from 'app/components/Breadcrumbs/MissionsListBreadcrumb';
import NewsBreadcrumb from 'app/components/Breadcrumbs/NewsBreadcrumb';
import VisualGuideBreadcrumb from 'app/components/Breadcrumbs/VisualGuideBreadcrumb';
import WikiBreadcrumb from 'app/components/Breadcrumbs/WikiBreadcrumb';
import { FilterLocationID } from 'app/store/kpis/types';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import {
  newsTypes,
  profilePageTypes,
  missionListTypes,
  missionReportTypes,
  visualGuideTypes,
  editorTypes,
} from './constants';

interface Route {
  value: string;
  create: (...args: any) => string;
  breadcrumb?: FC<{ match: Match<any> }>;
}

interface KeyToRouteMap {
  [key: string]: Route;
}

const idOrEmptyString = (id?: number | string) =>
  ['number', 'string'].includes(typeof id) ? id : '';

const createRoutes = <Routes extends KeyToRouteMap>(routes: Routes) => routes;

const routes = createRoutes({
  login: {
    value: '/',
    create: () => '/',
  },
  articleStudio: {
    value: '/article-studio',
    create: () => '/article-studio',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Article Studio' }}
      />
    ),
  },
  channels: {
    value: '/channels',
    create: () => '/channels',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Channels Studio' }}
      />
    ),
  },
  editor: {
    value: '/article-studio/editor',
    create: () => '/article-studio/editor',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Article Studio' }}
      />
    ),
  },
  editorArticle: {
    value: `/article-studio/editor/:id/:mode(${Object.values(editorTypes).join(
      '|'
    )})`,
    create: (articleId: string, mode: keyof typeof editorTypes) =>
      `/article-studio/editor/${articleId}/${mode}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Article Studio' }}
      />
    ),
  },
  audiences: {
    value: '/audiences',
    create: () => '/audiences',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Audiences' }}
      />
    ),
  },
  audience: {
    value: '/audiences/:id',
    create: (audienceId: number) => `/audiences/${audienceId}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Audiences' }}
      />
    ),
  },
  advancedDashboard: {
    value: '/advanced-dashboard/:dashboardId',
    create: (dashboardId) => `/advanced-dashboard/${dashboardId}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Advanced Dashboard' }}
      />
    ),
  },
  newsFeed: {
    value: `/news/:category(${Object.values(newsTypes).join('|')})`,
    create: (category = 'relevant') => `/news/${category}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb to={match.url} title={{ translationKey: 'News' }} />
    ),
  },
  newsArticle: {
    value: `/news/:category(${Object.values(newsTypes).join('|')})/:id(\\d+)`,
    create: (category = 'relevant', id: number) => `/news/${category}/${id}`,
    breadcrumb: NewsBreadcrumb,
  },
  wiki: {
    value: '/wiki',
    create: () => '/wiki',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb to={match.url} title={{ translationKey: 'Wiki' }} />
    ),
  },
  privacyPolicy: {
    value: '/privacy-policy',
    create: () => '/privacy-policy',
  },
  resetPassword: {
    value: '/reset-password',
    create: (email: string) => `/reset-password?email=${email}`,
  },
  wikiArticle: {
    value: '/wiki/:id(\\d+)',
    create: (id: number) => `/wiki/${id}`,
    breadcrumb: WikiBreadcrumb,
  },
  adminDashboard: {
    value: '/admin',
    create: () => '/admin',
  },
  profile: {
    value: `/profile/:category(${Object.values(profilePageTypes).join('|')})`,
    create: (category = '') => `/profile/${category}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'My Profile' }}
      />
    ),
  },
  user: {
    value: '/user/:id(\\d+)',
    create: (id: number) => `/user/${id}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb to={match.url} title={{ translationKey: 'Profile' }} />
    ),
  },
  missions: {
    value: '/missions',
    create: () => '/missions',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Missions' }}
      />
    ),
  },
  missionsList: {
    value: `/missions/:category(${Object.values(missionListTypes).join('|')})`,
    create: (category) => `/missions/${category}`,
    breadcrumb: MissionsListBreadcrumb,
  },
  mission: {
    value: '/missions/:id(\\d+)',
    create: (id: number) => `/missions/${id}`,
    breadcrumb: MissionBreadcrumb,
  },
  missionReport: {
    value: `/missions/:id(\\d+)/report/:category(${Object.values(
      missionReportTypes
    ).join('|')})/:teamId(\\d+)?`,
    create: (
      id: number,
      category: string = missionReportTypes.teams,
      teamId?: number
    ) => `/missions/${id}/report/${category}/${idOrEmptyString(teamId)}`,
    breadcrumb: MissionReportBreadcrumb,
  },
  missionActivity: {
    value: '/missions/:missionId(\\d+)/activity/:id(\\d+)',
    create: (missionId: number, activityId: number) =>
      `/missions/${missionId}/activity/${activityId}`,
    breadcrumb: MissionActivityBreadcrumb,
  },
  socialFeed: {
    value: '/feed/:postId(\\d+)?',
    create: (postId?: number) => `/feed/${idOrEmptyString(postId)}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Social Feed' }}
      />
    ),
  },
  visualGuides: {
    value: '/guides',
    create: () => '/guides',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Visual Guides' }}
      />
    ),
  },
  visualGuide: {
    value: `/guides/:id(\\d+)/:type(${Object.values(visualGuideTypes).join(
      '|'
    )})/:userId(\\d+)?`,
    create: (
      id: number,
      type: string = visualGuideTypes.guide,
      userId?: number
    ) => `/guides/${id}/${type}/${idOrEmptyString(userId)}`,
    breadcrumb: VisualGuideBreadcrumb,
  },
  kpis: {
    value: '/kpis',
    create: (location?: FilterLocationID) =>
      `/kpis${location ? `?location=${location}` : ''}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb to={match.url} title={{ translationKey: 'KPIs' }} />
    ),
  },
  kpi: {
    value: '/kpis/:handle(\\w+)',
    create: (handle: string, location?: FilterLocationID) =>
      `/kpis/${location ? `${handle}?location=${location}` : handle}`,
    breadcrumb: KPIBreadcrumb,
  },
  kpiRankings: {
    value: '/kpis/:handle(\\w+)/rankings',
    create: (handle: string) => `/kpis/${handle}/rankings`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'KPI rankings' }}
      />
    ),
  },
  notifications: {
    value: '/notifications',
    create: () => '/notifications',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb
        to={match.url}
        title={{ translationKey: 'Notifications' }}
      />
    ),
  },
  chat: {
    value: '/chat/:id?',
    create: (id?: string) => `/chat/${idOrEmptyString(id)}`,
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb to={match.url} title={{ translationKey: 'Chat' }} />
    ),
  },
  nikeSkuRedirect: {
    value: '/nike-sku/:redirectKey?/:tenant?',
    create: () => '/nike-sku',
  },
  atticusRedirect: {
    value: '/atticus',
    create: () => '/atticus',
  },
  channel: {
    value: '/channel/:id(\\d+)',
    create: (id: number) => `/channel/${id}`,
  },
  members: {
    value: '/members',
    create: () => '/members',
    breadcrumb: ({ match }) => (
      <DefaultBreadcrumb to={match.url} title={{ translationKey: 'Members' }} />
    ),
  },
});

export type { Route };
export default routes;

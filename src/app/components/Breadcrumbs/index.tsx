import { routes } from 'app/router';
import { Route } from 'app/router/routes';
import withBreadcrumbs, {
  BreadcrumbsRoute,
} from 'react-router-breadcrumbs-hoc';

import Seperator from './Seperator';

interface BreadcrumbsProps {
  breadcrumbs: Array<{
    breadcrumb: React.ReactNode;
    match: {
      isExact: boolean;
      path: string;
      url: string;
    };
  }>;
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <div>
      <div className="flex">
        {breadcrumbs.map(({ breadcrumb, match }, index) => (
          <span key={match.path} className="whitespace-nowrap flex">
            {index !== 0 && <Seperator />}
            {breadcrumb}
          </span>
        ))}
      </div>
    </div>
  );
};

const allRoutes: Array<BreadcrumbsRoute> = Object.entries(routes).map(
  ([_, route]: [unknown, Route]) => {
    return {
      path: route.value,
      breadcrumb: route?.breadcrumb,
    };
  }
);

export default withBreadcrumbs(allRoutes, {
  excludePaths: ['/', '/chat/:id'],
  disableDefaults: true,

  // TODO: fix after update to react-router-dom v6
  // @ts-ignore
})(Breadcrumbs);

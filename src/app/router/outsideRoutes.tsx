import config from 'app/config';

interface OutsideRoute {
  create: (...args: any) => string;
}

interface OutsideRoutes {
  [key: string]: OutsideRoute;
}

const routes: OutsideRoutes = {
  privacyPolicy: {
    create: () => `${config.env.privacyPolicyUrl}`,
  },
  adminDashboard: {
    create: (tenantUrl: string) => `${tenantUrl}/admin`,
  },
  termsOfService: {
    create: () => 'https://help.atobi.io/article/57-user-terms-of-service',
  },
};

export default routes;

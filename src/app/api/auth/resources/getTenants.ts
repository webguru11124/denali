import config from 'app/config';

import { request } from '../../request';
import { TenantResponse } from '../types';

const getTenants = (email: string) =>
  request().post<TenantResponse>(
    `${config.env.tenantApiUrl}/api/v1/auth/login`,
    {
      email,
    }
  );

export default getTenants;

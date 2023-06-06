import config from 'app/config';

import { request } from '../../request';
import { GetNikeSKUUSerResponse } from '../types';

interface GetNikeSKUUserRequest {
  redirectKey: string;
  tenant?: string;
}

const getNikeSKUUser = ({ redirectKey, tenant }: GetNikeSKUUserRequest) => {
  let options = undefined;

  if (tenant) {
    options = {
      baseURL: config.env.nikeSkuApiUrlTemplate.replace('{{tenant}}', tenant),
    };
  }

  return request().post<GetNikeSKUUSerResponse>(
    '/api/v1/redirect',
    {
      redirect_key: redirectKey,
    },
    options
  );
};

export default getNikeSKUUser;

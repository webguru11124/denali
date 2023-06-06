import { Response } from 'app/api/types';

import { request } from '../../request';
import { Audience } from '../types';

const getAudience = (id: number) =>
  request().get<Response<Audience>>(`/api/v1/audiences/${id}`);

export { getAudience };
export default getAudience;

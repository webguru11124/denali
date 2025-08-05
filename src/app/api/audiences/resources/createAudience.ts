import { request } from '../../request';
import { Response } from '../../types';
import { Audience } from '../types';

const createAudience = (data: {
  name: { [lang: string]: string };
  locations: number[];
  professions: number[];
}) => request().post<Response<Audience>>(`/api/v1/audiences`, data);

export { createAudience };
export default createAudience;

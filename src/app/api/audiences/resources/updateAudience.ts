import { request } from '../../request';
import { Response } from '../../types';
import { Audience } from '../types';

const updateAudience = ({
  data,
  id,
}: {
  data: {
    name: { [lang: string]: string };
    locations: number[];
    professions: number[];
  };
  id: number;
}) => request().put<Response<Audience>>(`/api/v1/audiences/${id}`, data);

export { updateAudience };
export default updateAudience;

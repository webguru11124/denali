import { request } from '../../request';
import { AudiencesResponse } from '../types';

const getAudiences = (page: number, query: string) =>
  request().get<AudiencesResponse>(`/api/v1/audiences`, {
    params: {
      query,
      page,
      per_page: 20,
    },
  });

export { getAudiences };
export default getAudiences;

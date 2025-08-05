import { request } from '../../request';
import { AudienceUsersResponse } from '../types';

const per_page = 20;

const getAudienceUsers = (id: number, page: number) =>
  request().get<AudienceUsersResponse>(`/api/v1/audiences/${id}/users`, {
    params: {
      id,
      page,
      per_page,
    },
  });

export { getAudienceUsers };
export default getAudienceUsers;

import { request } from '../../request';
import { MissionsResponse, MissionsRequestData } from '../types';

const getActiveMissions = ({
  page,
  perPage,
  query,
  tags,
}: MissionsRequestData) =>
  request().get<MissionsResponse>('/api/v1/missions/active', {
    params: {
      page,
      tags,
      query,
      per_page: perPage,
    },
  });

export default getActiveMissions;

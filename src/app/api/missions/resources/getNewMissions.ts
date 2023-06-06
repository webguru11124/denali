import { request } from '../../request';
import { MissionsResponse, MissionsRequestData } from '../types';

const getNewMissions = ({ page, perPage, query, tags }: MissionsRequestData) =>
  request().get<MissionsResponse>('/api/v1/missions/new', {
    params: {
      page,
      tags,
      per_page: perPage,
      query,
    },
  });

export default getNewMissions;

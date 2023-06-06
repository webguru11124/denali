import { Response } from 'app/api/types';

import { request } from '../../request';
import { ProfessionLocationUser } from '../types';

const getUsersFromLocationProfession = (
  locations: number[],
  professions: number[]
) =>
  request().get<Response<ProfessionLocationUser[]>>(`/api/v1/users?`, {
    params: {
      locations: locations.toString(),
      professions: professions.toString(),
    },
  });

export { getUsersFromLocationProfession };
export default getUsersFromLocationProfession;

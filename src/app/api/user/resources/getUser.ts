import { request } from '../../request';
import { PublicUserProfileResponse } from '../types';

const getUser = (id: number) =>
  request().get<PublicUserProfileResponse>(`/api/v2/profile/${id}`);

export default getUser;

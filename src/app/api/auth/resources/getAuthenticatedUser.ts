import { request } from '../../request';
import { UserProfileResponse } from '../types';

const getAuthenticatedUser = () =>
  request().get<UserProfileResponse>('/api/v2/me');

export default getAuthenticatedUser;

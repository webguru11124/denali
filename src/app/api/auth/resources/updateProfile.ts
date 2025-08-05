import { request } from '../../request';
import { UpdateProfileResponse, UpdateProfileData } from '../types';

const updateProfile = (data: UpdateProfileData) =>
  request().post<UpdateProfileResponse>('/api/v2/me/info', data);

export default updateProfile;

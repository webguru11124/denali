import { request } from '../../request';
import { ResponsiveMediaSizes } from '../../types';
import { ProfilePictureUpdateData } from '../types';

const requestProfilePictureUpdate = (data: ProfilePictureUpdateData) =>
  request().post<ResponsiveMediaSizes>('/api/v1/me/avatar', data);

export default requestProfilePictureUpdate;

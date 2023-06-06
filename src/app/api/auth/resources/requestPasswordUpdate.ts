import { request } from '../../request';
import { UpdatePasswordData, UpdatePasswordResponse } from '../types';

const requestPasswordUpdate = (data: UpdatePasswordData) =>
  request().post<UpdatePasswordResponse>('/api/v1/me/password', data);

export default requestPasswordUpdate;

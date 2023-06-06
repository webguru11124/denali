import { request } from '../../request';
import { PasswordResetResponse, PasswordResetRequest } from '../types';

const requestPasswordReset = (data: PasswordResetRequest) =>
  request().post<PasswordResetResponse>(`/api/v1/auth/sendResetEmail`, data);

export default requestPasswordReset;

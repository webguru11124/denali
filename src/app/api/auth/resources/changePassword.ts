import { request } from '../../request';
import { ChangePasswordRequest } from '../types';

const changePassword = ({
  passwordConfirmation,
  ...rest
}: ChangePasswordRequest) =>
  request().post(`/api/v1/auth/resetPassword`, {
    ...rest,
    password_confirmation: passwordConfirmation,
  });

export default changePassword;

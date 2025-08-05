import { request } from '../../request';
import {
  ValidateEmailTokenRequest,
  ValidateEmailTokenResponse,
} from '../types';

const validateEmailToken = (data: ValidateEmailTokenRequest) =>
  request().post<ValidateEmailTokenResponse>(
    '/api/v1/auth/validate-token',
    data
  );

export default validateEmailToken;

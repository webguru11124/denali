import { request } from '../../request';
import { EnabledModulesResponse } from '../types';

const getEnabledModules = () =>
  request().get<EnabledModulesResponse>(`/api/v1/settings/modules`);

export default getEnabledModules;

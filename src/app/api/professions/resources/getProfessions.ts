import { Response } from 'app/api/types';

import { request } from '../../request';
import { Profession } from '../types';

const getProfessions = () =>
  request().get<Response<Array<Profession>>>(`/api/admin/v1/professions`);

export { getProfessions };
export default getProfessions;

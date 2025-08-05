import request  from '../request';
import { SisenseListResponse } from '../types';

const getSisenseList = () =>
  request().get<SisenseListResponse>('/api/v1/dashboards');

export default getSisenseList;

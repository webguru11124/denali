import { request } from '../../request';
import { LocationResponse } from '../types';

const getLocations = () =>
  request().get<Array<LocationResponse>>(`/api/admin/v1/locations`);

export { getLocations };
export default getLocations;

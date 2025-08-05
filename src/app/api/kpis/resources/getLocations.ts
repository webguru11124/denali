import { request } from '../../request';
import { LocationResponse } from '../types';

const getLocations = () =>
  request().get<LocationResponse>('/api/v1/locations/user/descendantsAndSelf');

export default getLocations;

import { request } from '../../request';
import { VisualGuidesResponse } from '../types';

const getVisualGuides = () =>
  request().get<VisualGuidesResponse>('/api/v1/vm-guides');

export default getVisualGuides;

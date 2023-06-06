import { request } from '../../request';
import { VisualGuideResponse } from '../types';

const getVisualGuide = (id: number) =>
  request().get<VisualGuideResponse>(`/api/v1/vm-guides/${id}`);

export default getVisualGuide;

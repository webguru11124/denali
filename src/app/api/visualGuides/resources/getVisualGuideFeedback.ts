import { request } from '../../request';
import { VisualGuideFeedbackResponse } from '../types';

const getGuideFeedback = (id: number) =>
  request().get<VisualGuideFeedbackResponse>(`/api/v1/vm-guides/${id}/files`);

export default getGuideFeedback;

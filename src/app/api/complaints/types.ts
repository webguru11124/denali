import { Response } from '../types';

import { ComplaintTypes, ComplaintStatus } from './constants';

export interface ComplaintObject {
  id: number;
  status: ComplaintStatus;
}

export interface Complaint {
  type: ComplaintTypes;
  reporter_id: number;
  reason_for_reporting?: string;
  complaint_object: ComplaintObject;
}

export type ComplaintResponse = Response<Array<Complaint>>;

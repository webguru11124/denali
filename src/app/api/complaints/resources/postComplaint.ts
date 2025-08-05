import { parseUnderscoreText } from 'app/utils/parsers';

import { request } from '../../request';
import { Complaint, ComplaintResponse } from '../types';

const postComplaint = ({ complaint_object, type, ...rest }: Complaint) =>
  request().post<ComplaintResponse>('/api/v1/complaints', {
    complaint_object: JSON.stringify(complaint_object),
    type: parseUnderscoreText(type),
    ...rest,
  });

export default postComplaint;

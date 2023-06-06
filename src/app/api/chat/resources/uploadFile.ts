import axios from 'axios';

import { BASE_CONFIG } from '../request';
import { UploadFileRequest, UploadFileResponse } from '../types';

// Default axios request is used since we need raw headers data
// Customized axios instance has interceptor that camelcases response
const uploadFile = ({
  chatToken,
  authToken,
  ...restProps
}: UploadFileRequest) =>
  axios.post<UploadFileResponse>(`${BASE_CONFIG.apiUrl}/api/file`, restProps, {
    headers: {
      authorization: `Bearer ${authToken}`,
      'acs-token': chatToken,
    },
  });

export default uploadFile;

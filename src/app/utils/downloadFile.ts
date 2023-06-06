import axios from 'axios';
import fileDownload from 'js-file-download';

import getFileNameFromUrl from './getFileNameFromUrl';
import logger from './logger';

const downloadFile = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
      responseType: 'blob',
    })
    .then((response) => {
      fileDownload(response.data, getFileNameFromUrl(url));
    })
    .catch(logger.error);

export default downloadFile;

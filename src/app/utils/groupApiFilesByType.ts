import { ApiFile, ApiMediaFile, NonMediaFile } from 'app/api/types';

import isMedia from './isMedia';

interface GroupedFiles {
  files: Array<NonMediaFile>;
  media: Array<ApiMediaFile>;
}

const defaultValue = {
  media: [] as Array<ApiMediaFile>,
  files: [] as Array<NonMediaFile>,
};

const groupFileByType = (files: Array<ApiFile>): GroupedFiles =>
  files.reduce((acc, file) => {
    if (isMedia(file)) {
      return {
        ...acc,
        media: [...acc.media, file],
      };
    }

    return {
      ...acc,
      files: [...acc.files, file],
    };
  }, defaultValue);

export default groupFileByType;

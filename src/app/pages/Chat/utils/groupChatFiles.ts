import { MessageFile } from 'app/api/chat/types';

import { GroupedFiles } from '../types';

import isMessageFileMedia from './isMessageFileMedia';

const groupChatFiles = (files: MessageFile[]) => {
  return files.reduce<GroupedFiles>(
    (acc, curr) => {
      if (isMessageFileMedia(curr)) {
        return {
          ...acc,
          media: [...acc.media, curr],
        };
      }

      return {
        ...acc,
        files: [...acc.files, curr],
      };
    },
    { files: [], media: [] }
  );
};

export default groupChatFiles;

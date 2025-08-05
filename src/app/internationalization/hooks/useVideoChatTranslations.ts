import { VideoChatKeys } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useVideoChatTranslations = () =>
  useBaseTranslation<VideoChatKeys>(undefined, {
    keyPrefix: 'videoChat',
  });

export default useVideoChatTranslations;

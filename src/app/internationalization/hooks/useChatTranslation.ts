import { ChatKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useChatTranslation = () => {
  const translation = useBaseTranslation<ChatKey>(undefined, {
    keyPrefix: 'chat',
  });

  return translation;
};

export default useChatTranslation;

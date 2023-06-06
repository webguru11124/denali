import { SocialFeedKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useSocialFeedTranslation = () => {
  const translation = useBaseTranslation<SocialFeedKey>(undefined, {
    keyPrefix: 'socialFeed',
  });

  return translation;
};

export default useSocialFeedTranslation;

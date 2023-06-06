import { MembersKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useMembersTranslation = () => {
  const translation = useBaseTranslation<MembersKey>(undefined, {
    keyPrefix: 'members',
  });

  return translation;
};

export default useMembersTranslation;

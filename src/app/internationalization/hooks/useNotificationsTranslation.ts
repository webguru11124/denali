import { NotificationsKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useNotificationsTranslation = () => {
  const translation = useBaseTranslation<NotificationsKey>(undefined, {
    keyPrefix: 'notifications',
  });

  return translation;
};

export default useNotificationsTranslation;

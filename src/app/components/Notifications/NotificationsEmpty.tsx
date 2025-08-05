import { useNotificationsTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

const NotificationsEmpty: FC = () => {
  const { t } = useNotificationsTranslation();

  return (
    <div className="flex items-center w-full h-full justify-center flex-col">
      <p className="text-2xl">{t('Empty_icon')}</p>
      <p className="text-sm mt-2">{t('You have no new notifications yet')}</p>
    </div>
  );
};

export default NotificationsEmpty;

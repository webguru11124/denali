import styled from '@emotion/styled';
import { NotificationFilter } from 'app/api/notifications/constants';
import { Notification } from 'app/api/notifications/types';
import {
  useComponentsTranslation,
  useModulesTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';

import { NotificationsHeader, NotificationsCard } from '../Notifications';

interface NotificationsPopupProps {
  onClose: () => void;
  isLoading?: boolean;
  filter: NotificationFilter;
  onFilterChange: () => void;
  notifications?: Array<Notification>;
}

const Container = styled.div`
  width: 375px;
  max-height: 692px;
  overflow: hidden;
`;

const NotificationsContainer = styled.div`
  height: 500px;
`;

const NotificationsPopup: FC<NotificationsPopupProps> = ({
  onClose,
  filter,
  onFilterChange,
  isLoading,
  notifications,
}) => {
  const { t } = useComponentsTranslation();
  const { t: tModule } = useModulesTranslation();

  return (
    <Container className="absolute right-4 transform mt-1 z-50 shadow-atobi w-full border-grayscale-bg-dark rounded-lg bg-white">
      <div className="px-4 pt-4">
        <p className="text-lg font-bold">{tModule('Notifications')}</p>

        <NotificationsHeader filter={filter} onFilterChange={onFilterChange} />
      </div>
      <NotificationsContainer className="border-b px-2 mt-2 relative border-gray-light">
        <Scrollbars autoHeightMax={500}>
          <NotificationsCard
            notifications={notifications || []}
            isLoading={isLoading}
          />
        </Scrollbars>
      </NotificationsContainer>
      <div className="flex justify-center pb-4">
        <Link
          onClick={onClose}
          className="mt-3 text-focus"
          to={routes.notifications.create()}
        >
          {t('See all notifications')}
        </Link>
      </div>
    </Container>
  );
};

export default NotificationsPopup;

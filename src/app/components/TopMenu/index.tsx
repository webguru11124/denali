import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { hooks } from 'app/api/auth';
import { NotificationFilter } from 'app/api/notifications/constants';
import { useNotificationsQuery } from 'app/api/notifications/hooks';
import config from 'app/config';
import { useSelector } from 'app/hooks';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { outsideRoutes } from 'app/router';
import { selectors } from 'app/store/auth';
import { createDeprecatedAtobiURL } from 'app/utils';
import adminIcon from 'assets/icons/admin.svg';
import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useLocation } from 'react-router-dom';
import ArrowDownIcon from 'remixicon-react/ArrowDownSLineIcon';
import MenuIcon from 'remixicon-react/Menu2LineIcon';

import Breadcrumbs from '../Breadcrumbs';

import NotificationsIcon from './NotificationsIcon';
import NotificationsPopup from './NotificationsPopup';
import UserMenu from './UserMenu';

const { useAuthenticatedUser } = hooks;

export const MENU_HEIGHT = '56px';

const MenuContainer = styled.div`
  height: ${MENU_HEIGHT};
`;

interface TopMenuProps {
  toggleSidebar: () => void;
  isClipped: boolean;
  isMobile: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({
  toggleSidebar,
  isClipped,
  isMobile,
}) => {
  const { data, logout } = useAuthenticatedUser();
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const tenant = useSelector(selectors.getSelectedTenant);
  const [notificationFilter, setNotificationFilter] = useState(
    NotificationFilter.unread
  );
  const { t } = useComponentsTranslation();
  const { data: notifications, isLoading: isNotificationsLoading } =
    useNotificationsQuery(notificationFilter, Boolean(data));

  const location = useLocation();
  useEffect(() => {
    setIsUserMenuVisible(false);
  }, [location]);

  // prevent flickering
  if (!data) return <MenuContainer className="w-full" />;

  return (
    <>
      <MenuContainer />
      <div
        className={cx(
          'text-black fixed z-40 bg-white min-h-14 max-h-14 flex items-center transition-all duration-300 w-full border-b border-grayscale-bg-dark',
          css`
            padding-left: 24px;
            @media (min-width: ${config.screenSizes.xl}) {
              padding-left: ${!isClipped ? '249px' : '100px'};
            }
          `
        )}
      >
        <div className="font-bold text-lg flex items-center">
          {!isClipped && isMobile && (
            <button type="button" className="ml-4 mr-6" onClick={toggleSidebar}>
              <MenuIcon className="text-grayscale-secondary" />
            </button>
          )}
          <Breadcrumbs />
        </div>
        <div className="relative ml-auto flex">
          <div className="flex items-center">
            <OutsideClickHandler
              onOutsideClick={() => setDisplayNotifications(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setDisplayNotifications((prev) => !prev);
                }}
                className="mr-6"
              >
                <NotificationsIcon
                  isActive={displayNotifications}
                  hasUnread={Boolean(notifications?.find(({ read }) => !read))}
                />
              </button>
              {displayNotifications && (
                <NotificationsPopup
                  notifications={notifications}
                  isLoading={isNotificationsLoading}
                  filter={notificationFilter}
                  onFilterChange={() =>
                    setNotificationFilter((prev) => {
                      if (prev === NotificationFilter.all)
                        return NotificationFilter.unread;

                      return NotificationFilter.all;
                    })
                  }
                  onClose={() => setDisplayNotifications(false)}
                />
              )}
            </OutsideClickHandler>
          </div>
          <span className="border-r border-gray-light mr-6" />
          {data.isAdmin && (
            <a
              className="flex text-sm items-center text-grayscale-primary mr-4"
              target="_blank"
              href={outsideRoutes.adminDashboard.create(
                createDeprecatedAtobiURL(String(tenant?.url))
              )}
              rel="noreferrer"
            >
              <img
                src={adminIcon}
                alt={`${t('Switch to Admin')}`}
                className="mr-1"
              />
              {t('Switch to Admin')}
            </a>
          )}
          <div className="relative">
            <OutsideClickHandler
              onOutsideClick={() => setIsUserMenuVisible(false)}
            >
              <button
                onClick={() => setIsUserMenuVisible((prevState) => !prevState)}
                type="button"
                className="flex items-center mr-4"
              >
                <img
                  src={data.avatars.small}
                  alt="User avatar"
                  className="w-8 h-8 rounded-lg bg-gray-dark mr-3"
                />
                <ArrowDownIcon className="w-4" />
              </button>
              {isUserMenuVisible && (
                <UserMenu logout={logout} name={data.name} />
              )}
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMenu;

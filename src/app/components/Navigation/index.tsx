import { css, cx } from '@emotion/css';
import { Feature } from '@paralleldrive/react-feature-toggles';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import useChannels from 'app/api/channels/hooks/useChannels';
import { useUnreadThreadsAmount } from 'app/api/chat/hooks';
import useSisense from 'app/api/sisenseDashboard/hooks/useSisense';
import { FeatureFlagKey } from 'app/config/types';
import { useSelector } from 'app/hooks';
import {
  useCommonTranslation,
  useModulesTranslation,
} from 'app/internationalization/hooks';
import getChannelTitle from 'app/pages/Editor/utils/getChannelTitle';
import { selectors } from 'app/store/request';
import { isActiveFeatureName } from 'app/utils';
import eachChannelIcon from 'assets/icons/channels-medium.svg';
import channelsIcon from 'assets/icons/channels.svg';
import {
  Book1,
  CardEdit,
  ChartSquare,
  Clipboard,
  DocumentText1,
  ExportSquare,
  LampCharge,
  Messages2,
  People,
  TextalignJustifycenter,
  TextalignJustifyright,
  UserSquare,
} from 'iconsax-react';
import React, { useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useLocation } from 'react-router-dom';
import DashboardIcon from 'remixicon-react/DashboardLineIcon';
import LikeIcon from 'remixicon-react/Heart3LineIcon';

import routes from '../../router/routes';
import Logo from '../Logo';
import ScrollbarContainer from '../ScrollbarContainer';

import NavigationLink from './NavigationLink';
import useUnseenNewsAmountQuery from './useUnseenNewsAmountQuery';

export const SIDEBAR_WIDTH = `225px`;
const SIDEBAR_WIDTH_HIDDEN = '0px';
export const SIDEBAR_WIDTH_CLIPPED = '70px';

const BADGE_KEYS = {
  unseenNewsAmount: 'unseenNewsAmount',
  unreadThreadsAmount: 'unreadThreadsAmount',
};

interface Link {
  title: string;
  Icon: React.ComponentType;
  to: string;
  badgeName?: string;
  isActive?: (currentRoute: string) => boolean;
  feature?: FeatureFlagKey;
  tag?: boolean;
}

type Variant = 'desktop' | 'mobile' | 'desktop-clipped' | 'mobile-hidden';

interface NavigationProps {
  toggle: () => void;
  variant: Variant;
}

export const getWidth = (variant: Variant) => {
  switch (variant) {
    case 'mobile-hidden':
      return SIDEBAR_WIDTH_HIDDEN;
    case 'mobile':
      return SIDEBAR_WIDTH;
    case 'desktop':
      return SIDEBAR_WIDTH;
    case 'desktop-clipped':
      return SIDEBAR_WIDTH_CLIPPED;
    default:
      return SIDEBAR_WIDTH_HIDDEN;
  }
};

const OPEN_NAVIGATION_VARIANTS: Array<Variant> = ['desktop', 'mobile'];

const Navigation: React.FC<NavigationProps> = ({ toggle, variant }) => {
  const location = useLocation();
  const instanceIsReady = useSelector(selectors.getRequestInstanceReady);
  const { data: user } = useAuthenticatedUser();
  const { t } = useModulesTranslation();
  const { t: ct } = useCommonTranslation();
  const { isCollaborator, showAdvancedDashboard } = useAuthenticatedUser();
  const { data: unseenAmount, refetch } = useUnseenNewsAmountQuery(
    Boolean(user)
  );
  const { channels } = useChannels();
  const { unreadThreadsAmount } = useUnreadThreadsAmount();

  const { sisenseList } = useSisense();

  useEffect(() => {
    if (variant === 'mobile') {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if ((variant === 'mobile' || variant === 'desktop') && instanceIsReady)
      refetch();
  }, [variant, refetch, instanceIsReady]);

  const badgeData = {
    [BADGE_KEYS.unseenNewsAmount]: unseenAmount,
    [BADGE_KEYS.unreadThreadsAmount]: unreadThreadsAmount,
  };

  const ChannelsIcon = () => (
    <div className="h-6 w-6">
      <img className="h-full w-full" src={channelsIcon} alt="channels" />
    </div>
  );

  const getContentManagementNavLinks = (): Array<Link> => [
    {
      title: t('Article Studio'),
      Icon: CardEdit,
      tag: true,
      to: routes.articleStudio.create(),
    },
    {
      title: t('Audiences'),
      Icon: People,
      to: routes.audiences.create(),
    },
    {
      title: t('Channels Studio'),
      Icon: ChannelsIcon,
      to: routes.channels.create(),
    },
  ];

  const getModulesNavLinks = (): Array<Link> => [
    {
      title: t('Social Feed'),
      Icon: LikeIcon,
      to: routes.socialFeed.create(),
      feature: 'social',
    },
    {
      title: t('News'),
      Icon: DocumentText1,
      to: routes.newsFeed.create(),
      isActive: (currentRoute: string) => currentRoute.includes('/news/'),
      badgeName: BADGE_KEYS.unseenNewsAmount,
      feature: 'news',
    },
    {
      title: t('Missions'),
      Icon: LampCharge,
      to: routes.missions.create(),
      isActive: (currentRoute: string) => currentRoute.includes('/missions'),
      feature: 'missions',
    },

    {
      title: t('Wiki'),
      Icon: Book1,
      to: routes.wiki.create(),
      isActive: (currentRoute: string) => currentRoute.includes('/wiki'),
    },
    {
      title: t('Chat'),
      Icon: Messages2,
      to: routes.chat.create(),
      feature: 'chat',
      badgeName: BADGE_KEYS.unreadThreadsAmount,
    },
    {
      title: t('Members'),
      Icon: UserSquare,
      to: routes.members.create(),
      feature: 'members',
      badgeName: BADGE_KEYS.unreadThreadsAmount,
    },
    {
      title: t('KPIs'),
      Icon: ChartSquare,
      to: routes.kpis.create(),
      feature: 'kpiDashboard',
    },
    {
      title: t('Visual Guides'),
      Icon: Clipboard,
      to: routes.visualGuides.value,
      feature: 'vmGuides',
    },
    {
      title: t('Nike Product Hub'),
      Icon: ExportSquare,
      to: routes.nikeSkuRedirect.create(),
      feature: 'nikeSKU',
    },
    {
      title: t('adidas Product Learning'),
      Icon: ExportSquare,
      to: routes.atticusRedirect.create(),
      feature: 'atticus',
    },
  ];

  const getChannelsNavLinks = (): Array<Link> => {
    if (!channels?.length) return [];
    return channels.map((channel) => {
      return {
        title: getChannelTitle(channel),
        Icon: () => <img className="h-6 w-6" src={eachChannelIcon} alt="" />,
        to: routes.channel.create(channel.id),
        isActive: (currentRoute: string) =>
          currentRoute.includes(`/channel/${channel.id}`),
        feature: 'social',
      };
    });
  };

  const width = getWidth(variant);
  const menuOpen = OPEN_NAVIGATION_VARIANTS.includes(variant);

  return (
    <div className="duration-300 overflow-hidden">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (variant === 'mobile') {
            toggle();
          }
        }}
      >
        <div
          className={cx(
            'flex flex-col duration-300 overflow-hidden pt-2 z-50 bg-grayscale-bg-dark fixed t-0 h-screen border-gray-light',
            variant === 'mobile-hidden' ? 'px-0 border-r-0' : 'border-r',
            css`
              width: ${width};
            `
          )}
        >
          <div
            className={cx('mx-2 mb-3 flex items-center px-2', {
              'justify-between': menuOpen,
              'justify-center': !menuOpen,
            })}
          >
            <Logo visible={variant !== 'desktop-clipped'} />
            <button type="button" className="mt-3" onClick={toggle}>
              {menuOpen ? (
                <TextalignJustifyright className="text-grayscale-secondary" />
              ) : (
                <TextalignJustifycenter className="text-grayscale-secondary" />
              )}
            </button>
          </div>
          <ScrollbarContainer className="overflow-y-scroll h-screen px-2">
            <nav className="flex-col flex text-grayscale-primary">
              <Feature>
                {({ features }) => (
                  <>
                    {showAdvancedDashboard() && (
                      <>
                        <div className="py-4 px-4 mb-1 flex items-center">
                          <span
                            className={cx(
                              'overflow-hidden whitespace-nowrap text-xs text-sp tracking-[1.5px]',
                              {
                                'text-grayscale-secondary':
                                  variant !== 'desktop-clipped',
                                'text-transparent':
                                  variant === 'desktop-clipped',
                              }
                            )}
                          >
                            ADVANCED DASHBOARD
                          </span>
                        </div>
                        {sisenseList &&
                          sisenseList.map(({ oid, title }) => {
                            return (
                              <NavigationLink
                                key={oid}
                                Icon={DashboardIcon}
                                isClipped={variant === 'desktop-clipped'}
                                to={routes.advancedDashboard.create(oid)}
                              >
                                <div className="flex">
                                  <div className="whitespace-nowrap ml-1">
                                    {title}
                                  </div>
                                </div>
                              </NavigationLink>
                            );
                          })}
                      </>
                    )}

                    {isCollaborator() && (
                      <>
                        <div className="py-4 px-4 mb-1 flex items-center">
                          <span
                            className={cx(
                              'overflow-hidden whitespace-nowrap text-xs text-sp tracking-[1.5px]',
                              {
                                'text-grayscale-secondary':
                                  variant !== 'desktop-clipped',
                                'text-transparent':
                                  variant === 'desktop-clipped',
                              }
                            )}
                          >
                            CONTENT MANAGEMENT
                          </span>
                        </div>

                        {getContentManagementNavLinks().map(
                          ({
                            title,
                            Icon,
                            to,
                            isActive,
                            badgeName,
                            feature,
                            tag,
                          }) => {
                            if (
                              feature &&
                              !isActiveFeatureName(feature, features)
                            ) {
                              return null;
                            }

                            return (
                              <NavigationLink
                                key={to}
                                badge={
                                  badgeName ? badgeData[badgeName] : undefined
                                }
                                isActive={
                                  isActive
                                    ? () => isActive(location.pathname)
                                    : undefined
                                }
                                Icon={Icon}
                                isClipped={variant === 'desktop-clipped'}
                                to={to}
                              >
                                <div className="flex">
                                  <div className="whitespace-nowrap ml-1">
                                    {title}
                                  </div>
                                  {tag && (
                                    <div className="flex bg-hover-blue px-1 py-1 ml-2 rounded-sm">
                                      <span className="text-xs text-focus">
                                        {ct('New')}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </NavigationLink>
                            );
                          }
                        )}
                      </>
                    )}
                  </>
                )}
              </Feature>
              <div className="py-4 px-4 mb-1 flex items-center min-h-4">
                <span
                  className={cx(
                    'overflow-hidden whitespace-nowrap text-xs tracking-[1.5px]',
                    {
                      'text-grayscale-secondary': variant !== 'desktop-clipped',
                      'text-transparent': variant === 'desktop-clipped',
                    }
                  )}
                >
                  MODULES
                </span>
              </div>

              <Feature>
                {({ features }) => (
                  <>
                    {getModulesNavLinks().map(
                      ({ title, Icon, to, isActive, badgeName, feature }) => {
                        if (feature && !isActiveFeatureName(feature, features))
                          return null;

                        return (
                          <NavigationLink
                            key={to}
                            badge={badgeName ? badgeData[badgeName] : undefined}
                            isActive={
                              isActive
                                ? () => isActive(location.pathname)
                                : undefined
                            }
                            Icon={Icon}
                            isClipped={variant === 'desktop-clipped'}
                            to={to}
                          >
                            <div className="whitespace-nowrap ml-1">
                              {title}
                            </div>
                          </NavigationLink>
                        );
                      }
                    )}
                  </>
                )}
              </Feature>

              {channels.length > 0 && (
                <div className="py-4 px-4 mb-1 flex items-center min-h-4">
                  <span
                    className={cx(
                      'overflow-hidden whitespace-nowrap text-xs tracking-[1.5px]',
                      {
                        'text-grayscale-secondary':
                          variant !== 'desktop-clipped',
                        hidden: variant === 'desktop-clipped',
                      }
                    )}
                  >
                    CHANNELS
                  </span>
                </div>
              )}

              <div className={cx({ hidden: variant === 'desktop-clipped' })}>
                <Feature>
                  {({ features }) => (
                    <>
                      {getChannelsNavLinks().map(
                        (
                          { title, Icon, to, isActive, badgeName, feature },
                          i
                        ) => {
                          if (
                            feature &&
                            !isActiveFeatureName(feature, features)
                          )
                            return null;
                          return (
                            <div key={i}>
                              <NavigationLink
                                key={to}
                                badge={
                                  badgeName ? badgeData[badgeName] : undefined
                                }
                                isActive={
                                  isActive
                                    ? () => isActive(location.pathname)
                                    : undefined
                                }
                                Icon={Icon}
                                isClipped={variant === 'desktop-clipped'}
                                to={to}
                              >
                                <div className="ml-1 line-clamp-1">{title}</div>
                              </NavigationLink>
                            </div>
                          );
                        }
                      )}
                    </>
                  )}
                </Feature>
              </div>
            </nav>
          </ScrollbarContainer>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default Navigation;

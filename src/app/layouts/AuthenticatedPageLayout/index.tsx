import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { Navigation, TopMenu, ToastContainer } from 'app/components';
import { ChatContextProvider } from 'app/context/ChatContext';
import { useScreenBreakpoint, useDispatch, useSelector } from 'app/hooks';
import { selectors, actions } from 'app/store/navigation';
import { isActiveFeatureName, isMobile as resolveIsMobile } from 'app/utils';
import { ReactNode, useEffect } from 'react';

import { ChatEventsHandler, ChatTokenHandler } from '../../handlers';
import CallProvider from '../../pages/VideoChat/providers/CallProvider';

interface Props {
  children: ReactNode;
}

export const resolveVariant = (isVisible: boolean, isMobile: boolean) => {
  if (isVisible) {
    if (isMobile) return 'mobile';

    return 'desktop';
  }

  return isMobile ? 'mobile-hidden' : 'desktop-clipped';
};

const AuthenticatedPageLayout = ({ children }: Props) => {
  const breakpoint = useScreenBreakpoint();
  const isMobile = resolveIsMobile(breakpoint);
  const dispatch = useDispatch();
  const features = useFeatures();
  const isSidebarVisible = useSelector(selectors.getIsSidebarOpen);
  const isFullPage = useSelector(selectors.getIsFullPage);
  const isClipped = !isSidebarVisible && !isMobile;
  const variant = resolveVariant(isSidebarVisible, isMobile);
  const isVideoChatEnabled = isActiveFeatureName('videoChat', features);

  useEffect(() => {
    if (isMobile) {
      dispatch(actions.sideMenuDisplayChanged(false));
    }
  }, [dispatch, isMobile]);

  const toggleSidebar = () =>
    dispatch(actions.sideMenuDisplayChanged(!isSidebarVisible));

  const renderContent = () => (
    <ChatTokenHandler>
      <ChatContextProvider>
        <ChatEventsHandler>
          <div className="flex w-full min-h-screen">
            <ToastContainer />
            {!isFullPage && (
              <Navigation toggle={toggleSidebar} variant={variant} />
            )}
            <div className="flex flex-col items-center w-full h-full">
              {!isFullPage && (
                <TopMenu
                  isClipped={isClipped}
                  toggleSidebar={toggleSidebar}
                  isMobile={isMobile}
                />
              )}

              <div className="flex w-full justify-center lg:duration-300 duration-0 h-full">
                {children}
              </div>
            </div>
          </div>
        </ChatEventsHandler>
      </ChatContextProvider>
    </ChatTokenHandler>
  );

  return isVideoChatEnabled ? (
    <CallProvider>{renderContent()}</CallProvider>
  ) : (
    renderContent()
  );
};

export default AuthenticatedPageLayout;

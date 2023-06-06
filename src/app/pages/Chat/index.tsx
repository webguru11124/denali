import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ThreadType } from 'app/api/chat/constants';
import { useThreads } from 'app/api/chat/hooks';
import { PageLoader, Feature, RequestError } from 'app/components';
import { getWidth } from 'app/components/Navigation';
import { MENU_HEIGHT } from 'app/components/TopMenu';
import { useSelector, useScreenBreakpoint } from 'app/hooks';
import { resolveVariant } from 'app/layouts/AuthenticatedPageLayout';
import { selectors } from 'app/store/navigation';
import { isMobile } from 'app/utils';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Conversation from './Conversation';
import NoConversationSelected from './NoConversationSelected';
import SideBar from './SideBar';

const Container = styled.div`
  height: calc(100vh - ${MENU_HEIGHT});
`;

const Chat = () => {
  const { data: threads, isLoading, error } = useThreads();
  const breakpoint = useScreenBreakpoint();
  const { id: threadId } = useParams<{ id?: string }>();
  const isSidebarOpen = useSelector(selectors.getIsSidebarOpen);
  const navigationMenuOffset = getWidth(
    resolveVariant(isSidebarOpen, isMobile(breakpoint))
  );

  if (error) {
    return <RequestError status="chat" />;
  }

  if (!threads || isLoading) {
    return <PageLoader />;
  }

  const selectedThread = threadId
    ? threads.find(({ id }) => id === threadId)
    : undefined;

  return (
    <Container
      className={cx(
        'flex-1 pt-1',
        css`
          margin-left: ${navigationMenuOffset};
        `
      )}
    >
      <div className="row max-w-full h-full border-t border-gray-light">
        <div className="xl:col-3 col-5 pr-0 h-full border-r border-gray-light">
          {threads && (
            <SideBar selectedThreadId={selectedThread?.id} threads={threads} />
          )}
        </div>
        <div className="xl:col-9 col-7 h-full p-0">
          <div className="flex h-full items-center justify-center">
            {selectedThread ? (
              <Conversation
                isDirect={selectedThread.type === ThreadType.direct}
                id={selectedThread.id}
                title={selectedThread.topic}
              />
            ) : (
              <NoConversationSelected />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

const FeaturedChat = () => <Feature feature="chat" activeComponent={Chat} />;

export default FeaturedChat;

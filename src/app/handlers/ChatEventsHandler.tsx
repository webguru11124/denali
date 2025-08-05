import { ReactNode } from 'react';

import { useLiveEvents } from '../pages/Chat/hooks';

interface Props {
  children: ReactNode;
}

const ChatEventsHandler = ({ children }: Props) => {
  useLiveEvents();
  return <>{children}</>;
};

export default ChatEventsHandler;

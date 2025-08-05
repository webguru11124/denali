import { ComplaintTypes } from 'app/api/complaints/constants';
import { useComplaints } from 'app/api/complaints/hooks';
import { useCallback, useMemo, ReactNode } from 'react';

import BlockingContext, { BlockingContextValue } from './context';

interface Props {
  children: ReactNode;
}

const BlockingProvider = ({ children }: Props) => {
  const complaints = useComplaints();

  const isUserHiddenOrBlocked = useCallback(
    (userId: number) =>
      complaints.user.hidden.includes(userId) ||
      complaints.user.blocked.includes(userId),
    [complaints.user]
  );

  const isHiddenOrBlocked = useCallback(
    (id: number, userId: number, type: ComplaintTypes) =>
      isUserHiddenOrBlocked(userId) ||
      complaints[type].hidden.includes(id) ||
      complaints[type].blocked.includes(id),
    [isUserHiddenOrBlocked, complaints]
  );

  const initialContextValue = useMemo<BlockingContextValue>(
    () => ({
      isHiddenOrBlocked,
      isUserHiddenOrBlocked,
    }),
    [isHiddenOrBlocked, isUserHiddenOrBlocked]
  );

  return (
    <BlockingContext.Provider value={initialContextValue}>
      {children}
    </BlockingContext.Provider>
  );
};

export default BlockingProvider;

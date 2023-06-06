import { ComplaintTypes } from 'app/api/complaints/constants';
import { createContext } from 'react';

export interface BlockingContextValue {
  isHiddenOrBlocked: (
    id: number,
    userId: number,
    type: ComplaintTypes
  ) => boolean;
  isUserHiddenOrBlocked: (userId: number) => boolean;
}

const BlockingContext = createContext<BlockingContextValue>({
  isHiddenOrBlocked: () => false,
  isUserHiddenOrBlocked: () => false,
});

export default BlockingContext;

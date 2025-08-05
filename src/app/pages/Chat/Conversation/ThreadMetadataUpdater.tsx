import { Message } from 'app/api/chat/types';
import { useEffect } from 'react';
import { useThrottledCallback } from 'use-debounce';

import useUpdateThreadMetadataMutation from '../hooks/useUpdateThreadMetadataMutation';

const SEEN_MESSAGE_THROTTLE_MS = 5000;

/**
 * This is a special component which doesn't render anything and
 * only updates user thread metadata.
 *
 * We need this component because of the limitation of the `use-debounce` library.
 * The throttled function which we pass to `useThrottledCallback` is stored as a reference.
 * Because of that if we don't introduce a separate component which is `mounted/unmounted` the
 * metada sending only happens every **5 seconds** regardless of switching to other Threads.
 *
 * Once we pass thread id as a key to this rendered component `<ThreadMetadataUpdater key={threadId} .../>`
 * the metadata sending happens precisely when expected:
 * - once on thread open
 * - every 5 seconds when new messages arrive
 */
const ThreadMetadataUpdater = ({
  threadId,
  firstMessage,
}: {
  threadId: string;
  firstMessage: Message | undefined;
}) => {
  const { updateThreadMetadata } = useUpdateThreadMetadataMutation();
  const updateMetadata = () =>
    updateThreadMetadata({ threadId, lastMessageReadOn: new Date() });
  const throttledUpdateThreadMetadata = useThrottledCallback(
    updateMetadata,
    SEEN_MESSAGE_THROTTLE_MS,
    {
      // we want to send a read receipt right away once we open a thread
      leading: true,
    }
  );
  useEffect(() => {
    throttledUpdateThreadMetadata();
  }, [firstMessage, throttledUpdateThreadMetadata]);

  useEffect(
    () =>
      // update the metada last time on the unmount of the component
      () =>
        updateMetadata(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

export default ThreadMetadataUpdater;

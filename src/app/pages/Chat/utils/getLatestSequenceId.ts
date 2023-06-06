import maxBy from 'lodash/maxBy';

import { ThreadMessagesCache } from '../types';

type GetLatestSequenceId = (data: ThreadMessagesCache) => number;

const getLatestSequenceId: GetLatestSequenceId = (cache) =>
  Number(
    maxBy<{ sequenceId: string }>(cache.pages?.[0]?.data?.messages, (msg) =>
      Number(msg.sequenceId)
    )?.sequenceId
  ) || 1;

export default getLatestSequenceId;

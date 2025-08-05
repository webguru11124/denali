import { MessagesResponse } from 'app/api/chat/types';
import { AxiosResponse } from 'axios';
import orderBy from 'lodash/orderBy';

import { UnionMessage, QueryCacheMessageResponse } from '../types';

const orderAndReduceMessages = (
  messages: Array<AxiosResponse<QueryCacheMessageResponse | MessagesResponse>>
) => {
  const reducedMessages = messages.reduce<Array<UnionMessage>>(
    (acc, page) => [...acc, ...page.data.messages],
    []
  );

  return orderBy(reducedMessages, (message) => Number(message.id), 'asc');
};

export default orderAndReduceMessages;

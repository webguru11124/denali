import { request } from '../../request';
import { UnseenAmountResponse } from '../types';

const getUnseenAmount = () =>
  request().get<UnseenAmountResponse>('/api/v1/news-feed/unseen-count');

export default getUnseenAmount;

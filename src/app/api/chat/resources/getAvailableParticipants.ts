import { request } from '../../request';
import {
  GetAvailableParticipantsRequest,
  AvailableParticipantsResponse,
} from '../types';

const getAvailableParticipants = (params: GetAvailableParticipantsRequest) =>
  request().get<AvailableParticipantsResponse>(
    '/api/v1/messenger/user-search',
    {
      params,
    }
  );

export default getAvailableParticipants;

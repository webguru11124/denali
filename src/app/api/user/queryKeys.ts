import { GetMemberListRequest } from './types';

export default {
  getUser: (id: number) => ['user', id],
  members: (params: GetMemberListRequest) => [
    'members',
    params,
  ],
};

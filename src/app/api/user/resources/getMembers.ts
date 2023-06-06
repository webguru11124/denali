import { request } from '../../request';
import { MembersResponse, GetMemberListRequest } from '../types';

const getMembers = (params: GetMemberListRequest) =>
  request().get<MembersResponse>(`/api/v1/user-management?`, {
    params
  });

export default getMembers;

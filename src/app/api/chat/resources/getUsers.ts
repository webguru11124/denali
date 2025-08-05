import { request } from '../request';
import { UserResponse } from '../types';

const getUsers = (apiToken: string, userIds: Array<number>) => {
  const params = new URLSearchParams(
    userIds.map((id) => ['id', id.toString()])
  );

  return request().get<UserResponse>('/api/user', {
    headers: {
      authorization: `Bearer ${apiToken}`,
    },
    params,
  });
};

export default getUsers;

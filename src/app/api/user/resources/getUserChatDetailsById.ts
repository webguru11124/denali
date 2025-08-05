import first from 'lodash/first';

import { request } from '../../request';
import { PublicUserChatDetailsListResponse } from '../types';

const getUsers = (ids: Array<number> = [], acsUserIds: Array<string> = []) =>
  request().post<PublicUserChatDetailsListResponse>(
    `/api/v1/messenger/room-data`,
    { ids, acs_user_ids: acsUserIds }
  );

const getUserChatDetailsById = (id: number) =>
  getUsers([id]).then((response) => {
    const { data: users } = response.data;
    const user = first(users);
    return { ...response, data: user };
  });

const getUserChatDetailsByAcsId = (id: string) =>
  getUsers([], [id]).then((response) => {
    const { data: users } = response.data;
    const user = first(users);
    return { ...response, data: user };
  });

export { getUserChatDetailsByAcsId, getUserChatDetailsById };

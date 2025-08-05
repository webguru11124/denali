import { RankingUser } from 'app/api/kpis/types';
import { FC } from 'react';

import UserCard from '../UserCard';

interface IndexedUser extends RankingUser {
  position: number;
}

interface UsersListProps {
  users: Array<IndexedUser>;
}

const UsersList: FC<UsersListProps> = ({ users }) => (
  <div className="row">
    {users.map(({ avatars, fullName, total, id, position }) => (
      <div className="2xl:col-3 col-4">
        <UserCard
          key={id}
          id={id}
          avatars={avatars}
          fullName={fullName}
          total={total}
          position={position}
        />
      </div>
    ))}
  </div>
);

export default UsersList;

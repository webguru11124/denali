import { PageLoader } from 'app/components';
import React from 'react';

import UserRow from './UserRow';
import useUsersQuery from './useUsersQuery';

interface PeopleListProps {
  articleId: number;
}

const PeopleList: React.FC<PeopleListProps> = ({ articleId }) => {
  const { data: users, isLoading } = useUsersQuery(articleId);

  if (isLoading || !users) {
    return <PageLoader />;
  }
  return (
    <div>
      {users.map(({ userAvatars, userName, userId }) => (
        <UserRow key={userId} avatar={userAvatars.medium} name={userName} />
      ))}
    </div>
  );
};

export default PeopleList;

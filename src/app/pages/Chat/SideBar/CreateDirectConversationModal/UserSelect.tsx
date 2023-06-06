import { AvailableParticipant } from 'app/api/chat/types';
import { FixedSizeInfiniteScroll } from 'app/components';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { makeAvatarFromUserId } from 'app/utils';
import first from 'lodash/first';
import { FC } from 'react';

import UserButton from './UserButton';

interface UserSelectProps {
  users: Array<AvailableParticipant>;
  hasMore: boolean;
  loadMore: VoidFunction;
  selectedUserId: number | null;
  onUserClick: (id: number) => void;
  isCreatingChat: boolean;
}

const UserSelect: FC<UserSelectProps> = ({
  users,
  hasMore,
  loadMore,
  onUserClick,
  isCreatingChat,
  selectedUserId,
}) => {
  const tenant = useSelector(selectors.getSelectedTenant);
  if (!tenant) {
    throw new Error(
      '[UserSelect]: direct conversation UserSelect: no selected tenant'
    );
  }
  return (
    <div>
      <FixedSizeInfiniteScroll
        dataLength={users.length}
        hasMore={hasMore}
        height="500px"
        loadMore={loadMore}
      >
        {users.map(({ fullName, professions, locations, id }) => (
          <UserButton
            isSelected={selectedUserId === id}
            disabled={isCreatingChat}
            key={id}
            className="mb-3"
            fullName={fullName}
            onClick={() => onUserClick(id)}
            avatarSrc={makeAvatarFromUserId(tenant.url, id)}
            location={String(first(locations)?.name)}
            profession={String(first(professions)?.name)}
          />
        ))}
      </FixedSizeInfiniteScroll>
    </div>
  );
};

export default UserSelect;

import { HideableContent, Container } from 'app/components';
import { FC } from 'react';

import Tag from './Tag';
import { User } from './types';

interface TagsProps {
  onTagClick: (id: string) => void;
  selectedUserID: string | null;
  users: Array<User>;
}

const Tags: FC<TagsProps> = ({ users, onTagClick, selectedUserID }) => (
  <HideableContent maxHeight={116}>
    <Container>
      <div className="row w-full">
        {users.map(({ id, avatars, name }) => (
          <div key={id} className="col-3 mb-4">
            <Tag
              isButton
              isSelected={id.toString() === selectedUserID}
              avatars={avatars}
              name={name}
              onClick={() => onTagClick(id.toString())}
            />
          </div>
        ))}
      </div>
    </Container>
  </HideableContent>
);

export default Tags;

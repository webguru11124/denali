import React from 'react';

interface UserRowProps {
  avatar: string;
  name: string;
}

const UserRow: React.FC<UserRowProps> = ({ avatar, name }) => (
  <div className="flex items-center shadow-card mb-2 rounded-lg">
    <div>
      <img
        src={avatar}
        className="rounded-l-lg h-16 w-16"
        alt={`${name} avatar`}
      />
    </div>
    <div className="text-sm text-grayscale-primary ml-4">{name}</div>
  </div>
);

export default UserRow;

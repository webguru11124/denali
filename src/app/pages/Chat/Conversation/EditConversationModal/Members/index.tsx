import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { PageLoader } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import UserIcon from 'remixicon-react/UserAddLineIcon';

import { useThreadParticipants, useThreadId } from '../../../hooks';

import ParticipantRow from './ParticipantRow';

interface MembersProps {
  onDisplayAddMembersFlow: () => void;
  isAdmin: boolean;
}

const Members: FC<MembersProps> = ({ onDisplayAddMembersFlow, isAdmin }) => {
  const threadId = useThreadId();
  const { data: user } = useAuthenticatedUser();
  if (!user) throw new Error('[Members]: no authenticated user');
  const { t } = useChatTranslation();
  const { data: participants, isLoading } = useThreadParticipants(threadId);

  if (!participants || isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col pt-4">
      {isAdmin && (
        <button
          type="button"
          onClick={onDisplayAddMembersFlow}
          className="flex items-center mb-3 disabled:opacity-50 disabled:cursor-default"
        >
          <span className="flex items-center w-12 h-12 justify-center bg-focus-background rounded p-4">
            <UserIcon className="min-w-6 w-6 h-6 text-focus" />
          </span>
          <p className="text-grayscale-secondary ml-2 text-sm font-bold">
            {t('Add members')}
          </p>
        </button>
      )}
      {participants.map(({ userId, avatarUrl, location, profession, name }) => (
        <ParticipantRow
          key={userId}
          fullName={name}
          location={location.name}
          userId={userId}
          profession={profession.name}
          avatar={avatarUrl}
          className="mb-3"
          canRemoveUser={userId !== user.id && isAdmin}
          isAdmin={isAdmin && userId === user.id}
        />
      ))}
    </div>
  );
};

export default Members;

import { cx } from '@emotion/css';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import DeleteIcon from 'remixicon-react/CloseLineIcon';

import { useRemoveParticipantMutation, useThreadId } from '../../../hooks';

interface ParticipantRowProps {
  avatar: string;
  location: string;
  profession: string;
  fullName: string;
  canRemoveUser: boolean;
  isAdmin: boolean;
  className?: string;
  userId: number;
}

const ParticipantRow: FC<ParticipantRowProps> = ({
  avatar,
  fullName,
  location,
  profession,
  canRemoveUser,
  className,
  isAdmin,
  userId,
}) => {
  const threadId = useThreadId();
  const { mutate: removeParticipant, isLoading } =
    useRemoveParticipantMutation(threadId);
  const { t } = useChatTranslation();
  return (
    <div className={cx('flex items-center', className)}>
      <div className="w-12 min-w-12 h-12">
        <img className="w-full h-full rounded-lg" src={avatar} alt={fullName} />
      </div>
      <div className="ml-3 text-xs">
        <p className="text-sm text-grayscale-primary">{fullName}</p>
        <p className="text-xs text-grayscale-secondary">
          {t('{{profession}} in {{location}}', {
            profession,
            location,
          })}
          {t('{{profession}} in {{location}}', {
            profession,
            location,
          })}
        </p>
      </div>
      <div className="ml-auto">
        {(() => {
          if (isAdmin) {
            return (
              <p className="text-sm text-grayscale-secondary">{t('Admin')}</p>
            );
          }

          if (canRemoveUser) {
            return (
              <button
                disabled={isLoading}
                onClick={() => {
                  removeParticipant(userId);
                }}
                type="button"
              >
                <DeleteIcon className="text-grayscale-secondary" />
              </button>
            );
          }

          return null;
        })()}
      </div>
    </div>
  );
};

export default ParticipantRow;

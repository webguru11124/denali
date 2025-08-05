import { cx } from '@emotion/css';
import { ComplaintTypes } from 'app/api/complaints/constants';
import { ComplaintsPopup } from 'app/components';
import { FC, useState } from 'react';
import DeleteIcon from 'remixicon-react/DeleteBin5LineIcon';
import ReplyLineIcon from 'remixicon-react/ReplyLineIcon';

import { useDeleteMessageMutation, useThreadId } from '../../../hooks';

import Button from './Button';
import DeleteModal from './DeleteModal';

interface MessageControlsProps {
  isMe: boolean;
  messageId: string;
  onReply?: () => void;
  ownerId: number;
  userName: string;
}

const isReplyEnabled = false;

const MessageControls: FC<MessageControlsProps> = ({
  isMe,
  messageId,
  onReply,
  ownerId,
  userName,
}) => {
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] =
    useState(false);
  const threadId = useThreadId();
  const { mutate: deleteMessage } = useDeleteMessageMutation({ threadId });

  return (
    <>
      {shouldDisplayDeleteModal && (
        <DeleteModal
          onDelete={() => deleteMessage({ messageId })}
          onClose={() => setShouldDisplayDeleteModal(false)}
        />
      )}
      <div
        className={cx('absolute top-1 h-full flex items-center', {
          'mr-1 -left-14 pr-2': isMe,
          'ml-1 -right-14 pl-2': !isMe,
        })}
      >
        {isMe && (
          <Button
            label=""
            className="mb-2"
            onClick={() => setShouldDisplayDeleteModal(true)}
            icon={DeleteIcon}
          />
        )}
        <Button
          label=""
          className="mb-2"
          onClick={onReply}
          icon={ReplyLineIcon}
        />
        {!isMe && (
          <ComplaintsPopup
            complaintObjectId={Number(messageId)}
            complaintType={ComplaintTypes.chatMessage}
            creatorUserId={ownerId}
            creatorName={userName}
            isChart
          />
        )}
      </div>
    </>
  );
};

export default MessageControls;

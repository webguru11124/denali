import { cx } from '@emotion/css';
import { Message } from 'app/api/chat/types';
import { useChatTranslation } from 'app/internationalization/hooks';
import React, { FC, memo } from 'react';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import ReplyLineIcon from 'remixicon-react/ReplyLineIcon';

import ReplyAttachments from './ReplyAttachments';

interface Props {
  className?: string;
  reply: Omit<Message, 'reply'>;
  onClose?: () => void;
}

const ReplyPreview: FC<Props> = (props) => {
  const { className, reply, onClose } = props;
  const { content, senderDisplayName, files = [], isMine } = reply;
  const { t } = useChatTranslation();

  return (
    <div
      className={cx(
        'w-full py-2 px-3 bg-grayscale-bg-dark border-l-4 border-focus flex items-center',
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-center">
          <ReplyLineIcon className="text-grayscale-secondary w-4 h-4 mr-1" />
          <span className="text-grayscale-secondary text-xs font-bold">
            {isMine ? t('You') : senderDisplayName}
          </span>
        </div>
        {!!content.message && (
          <div className="flex items-center mt-1">
            <span className="text-grayscale-secondary text-xs">
              {content.message}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {files && files.length > 0 && (
          <ReplyAttachments className="mr-2" files={files} />
        )}
        <CloseLineIcon
          onClick={onClose}
          className="text-grayscale-secondary w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default memo(ReplyPreview);

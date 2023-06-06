import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Message } from 'app/api/chat/types';
import { ComplaintTypes } from 'app/api/complaints/constants';
import BlockingContext from 'app/blockings/context';
import {
  useChatTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { FC, memo, useMemo, useContext } from 'react';
import ReplyLineIcon from 'remixicon-react/ReplyLineIcon';

import ReplyAttachments from './ReplyAttachments';

const Container = styled.div`
  bottom: -6px;
`;

interface Props {
  className?: string;
  reply: Omit<Message, 'reply'>;
  isParentMine: boolean;
  ownerId: number;
}

type ContentState = 'deleted' | 'hidden' | 'visible';

const ReplyMessage: FC<Props> = (props) => {
  const { className, reply, isParentMine, ownerId } = props;
  const {
    id,
    content,
    senderDisplayName,
    files = [],
    isMine,
    deletedOn,
  } = reply;

  const { isHiddenOrBlocked } = useContext(BlockingContext);

  const isHidden = useMemo(
    () => isHiddenOrBlocked(Number(id), ownerId, ComplaintTypes.chatMessage),
    [id, ownerId, isHiddenOrBlocked]
  );
  const { t } = useChatTranslation();
  const { t: tCommon } = useCommonTranslation();

  const contentState = useMemo<ContentState>(() => {
    if (deletedOn) return 'deleted';
    if (isHidden) return 'hidden';
    return 'visible';
  }, [deletedOn, isHidden]);

  return (
    <Container
      className={cx(
        'relative flex flex-col',
        { 'items-start': !isParentMine, 'items-end': isParentMine },
        className
      )}
    >
      <div className="pl-3 pt-2 pr-2 pb-3 border border-gray-dark flex-col flex rounded-xl">
        <div className="flex items-center">
          <ReplyLineIcon className="text-grayscale-secondary w-4 h-4 mr-1" />
          <span className="text-left text-grayscale-secondary text-xs font-bold">
            {isMine ? t('You') : senderDisplayName}
          </span>
        </div>
        {!!content.message && contentState === 'visible' && (
          <span className="text-left text-grayscale-secondary text-xs mt-1">
            {content.message}
          </span>
        )}
        {contentState === 'hidden' && (
          <div className="break-all text-sm w-full text-grayscale-secondary">
            {tCommon('This comment has been hidden.')}
          </div>
        )}
        {contentState === 'deleted' && (
          <div className="break-all text-sm w-full text-grayscale-secondary">
            {t('This message was deleted.')}
          </div>
        )}
        {contentState === 'visible' && files && files.length > 0 && (
          <ReplyAttachments
            className="mt-2 flex-row-reverse justify-end"
            files={files}
          />
        )}
      </div>
    </Container>
  );
};

export default memo(ReplyMessage);

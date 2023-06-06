import { cx } from '@emotion/css';
import { ComplaintTypes } from 'app/api/complaints/constants';
import BlockingContext from 'app/blockings/context';
import { Avatar, ComplaintsPopup } from 'app/components';
import { useTranslations } from 'app/hooks';
import { useCommonTranslation } from 'app/internationalization/hooks';
import React, { useMemo, useContext } from 'react';

interface CommentProps {
  avatarSrcSet: string;
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
  content: string;
  isMine: boolean;
}

const Comment: React.FC<CommentProps> = ({
  avatarSrcSet,
  id,
  userId,
  userName,
  createdAt,
  content,
  isMine,
}) => {
  const {
    translations: [translatedContent],
    isTranslating,
    isTranslated,
    toggleTranslation,
  } = useTranslations([content]);
  const { t } = useCommonTranslation();

  const { isHiddenOrBlocked } = useContext(BlockingContext);

  const isHidden = useMemo(
    () =>
      isHiddenOrBlocked(id, userId, ComplaintTypes.missionComment) && !isMine,
    [id, userId, isHiddenOrBlocked, isMine]
  );

  return (
    <div>
      <div
        className={cx(
          'flex rounded-lg rounded-tl-sm mb-3',
          isMine && 'bg-hover-blue'
        )}
      >
        <span>
          <Avatar
            className="h-8 w-8 rounded-lg rounded-tl-sm mt-0.5 ml-0.5"
            alt={userName}
            id={userId}
            srcSet={avatarSrcSet}
          />
        </span>
        <div className="w-full flex">
          <div className="ml-4">
            <p
              className={`text-xs font-bold ${
                isHidden ? 'text-grayscale-secondary' : 'text-grayscale-primary'
              } mt-0.5`}
            >
              By {userName}
            </p>
            <p className="text-xs text-grayscale-secondary">{createdAt}</p>
            {isHidden ? (
              <div className="my-2 text-sm text-grayscale-secondary">
                {t('This comment has been hidden.')}
              </div>
            ) : (
              <div className="my-2 text-sm">{translatedContent}</div>
            )}
          </div>
          {!isMine && !isHidden && (
            <div className="ml-auto">
              <ComplaintsPopup
                creatorName={userName}
                creatorUserId={userId}
                complaintObjectId={id}
                complaintType={ComplaintTypes.missionComment}
                onTranslate={toggleTranslation}
                isLoading={isTranslating}
                isTranslated={isTranslated}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

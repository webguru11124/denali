import { cx, css } from '@emotion/css';
import { types as baseTypes } from 'app/api';
import { ComplaintTypes } from 'app/api/complaints/constants';
import BlockingContext from 'app/blockings/context';
import { useTranslations } from 'app/hooks';
import {
  useComponentsTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';
import ControlsPopup from '../ControlsPopup';
import Dot from '../Dot';

import CommentItem from './Comment';
import EditComment from './EditComment';

interface CommentProps {
  commentId: number;
  avatar: string;
  userName: string;
  text: string;
  userLocation: string;
  createdAt: string;
  likesCount: number;
  likedByMe: boolean;
  className?: string;
  createdByMe: boolean;
  onEdit: (description: string) => void;
  onDelete: () => void;
  isLoading?: boolean;
  onLike: () => void;
  userId: number;
  userCommentId: number;
  deleteModalText: string;
  files?: Array<baseTypes.ApiFile>;
  complaintType: ComplaintTypes;
}

const Comment: React.FC<CommentProps> = ({
  commentId,
  avatar,
  userName,
  createdAt,
  text,
  userLocation,
  likesCount,
  likedByMe,
  className,
  createdByMe,
  onEdit,
  onDelete,
  onLike,
  userCommentId,
  files,
  isLoading,
  deleteModalText,
  complaintType,
}) => {
  const [shouldDisplayEditor, setShouldDisplayEditor] = useState(false);
  const { t } = useComponentsTranslation();
  const { t: tCommon } = useCommonTranslation();

  const { isHiddenOrBlocked } = useContext(BlockingContext);

  const isHidden = useMemo(
    () => isHiddenOrBlocked(commentId, userCommentId, complaintType),
    [commentId, userCommentId, isHiddenOrBlocked, complaintType]
  );

  const {
    translations: [translatedText],
    isTranslated,
    toggleTranslation,
  } = useTranslations([text]);

  return (
    <div
      className={cx('pt-2', {
        'bg-grayscale-bg-dark': shouldDisplayEditor,
      })}
    >
      <div className={cx('flex', className)}>
        <span>
          <Avatar
            id={userCommentId}
            className={cx(
              'mr-3 w-8 h-8',
              css`
                border-top-left-radius: 2px !important;
                border-bottom-right-radius: 2px !important;
                border-top-right-radius: 8px !important;
                border-bottom-left-radius: 8px !important;
              `
            )}
            src={avatar}
            alt="Avatar"
          />
        </span>
        {!shouldDisplayEditor ? (
          <div className="flex items-center w-full">
            <div>
              <div className="flex text-xs">
                <Link
                  to={routes.user.create(userCommentId)}
                  className={`font-bold ${
                    isHidden
                      ? 'text-grayscale-secondary'
                      : 'text-grayscale-primary'
                  }`}
                >
                  {t('By {{name}}', { name: userName })}
                </Link>{' '}
              </div>
              <div className="text-xs text-grayscale-secondary flex">
                <p>{createdAt}</p>
                <Dot className="mx-1 text-gray-light" />
                <p>{userLocation}</p>
              </div>
            </div>
            {!isHidden && (
              <div className="ml-auto text-grayscale-secondary">
                <ControlsPopup
                  userName={userName}
                  commentId={commentId}
                  userCommentId={userCommentId}
                  deleteModalText={deleteModalText}
                  editLabel={t('Edit Comment')}
                  deleteLabel={t('Delete Comment')}
                  onDisplayEditor={() => setShouldDisplayEditor(true)}
                  onTranslate={toggleTranslation}
                  createdByMe={createdByMe}
                  isLoading={isLoading}
                  isTranslated={isTranslated}
                  complaintType={complaintType}
                  onDelete={() => {
                    setShouldDisplayEditor(false);
                    onDelete();
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <EditComment
            onEdit={onEdit}
            defaultValue={translatedText}
            onCancel={() => setShouldDisplayEditor(false)}
          />
        )}
      </div>
      {!shouldDisplayEditor && !isHidden && (
        <CommentItem
          onLike={onLike}
          files={files}
          text={translatedText}
          likesCount={likesCount}
          likedByMe={likedByMe}
        />
      )}

      {isHidden && (
        <div className="ml-10 mt-2">
          <div className="flex text-grayscale-secondary items-center mt-2">
            {tCommon('This comment has been hidden.')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;

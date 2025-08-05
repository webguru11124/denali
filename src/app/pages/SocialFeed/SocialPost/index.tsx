import { cx } from '@emotion/css';
import { types as baseTypes } from 'app/api';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { ComplaintTypes } from 'app/api/complaints/constants';
import { types } from 'app/api/socialFeed';
import BlockingContext from 'app/blockings/context';
import {
  Dot,
  Input,
  HtmlContent,
  FileButton,
  ControlsPopup,
  ComplaintsPopup,
  TypedIconButton,
} from 'app/components';
import { useTranslations } from 'app/hooks';
import {
  useSocialFeedTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { getFileNameFromUrl } from 'app/utils';
import { FC, useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CommentIcon from 'remixicon-react/Chat1LineIcon';
import LikeFillIcon from 'remixicon-react/Heart3FillIcon';
import LikeIcon from 'remixicon-react/Heart3LineIcon';
import SendIcon from 'remixicon-react/SendPlane2FillIcon';

import FileContents from './FileContents';
import PostData from './PostData';
import SocialPostComments from './SocialPostComments';
import usePostCommentMutation from './usePostCommentMutation';
import usePostLikeMutation from './usePostLikeMutation';

interface SocialPostProps {
  name: string;
  profileImage: string;
  createdAt: string;
  userLocation: string;
  replies: Array<types.Reply>;
  text: string;
  isMarkdown: boolean;
  files: Array<baseTypes.ApiFile>;
  likedByMe: boolean;
  likesCount: number;
  id: number;
  userId: number;
  onDelete: () => void;
  onDisplayEditModal: () => void;
}

const visualFiles = [baseTypes.FileType.image, baseTypes.FileType.video];

const SocialPost: FC<SocialPostProps> = ({
  name,
  profileImage,
  createdAt,
  userLocation,
  replies,
  isMarkdown,
  text,
  files,
  likedByMe,
  likesCount,
  userId,
  id,
  onDelete,
  onDisplayEditModal,
}) => {
  const { data: user } = useAuthenticatedUser();
  const { comment } = usePostCommentMutation(id);
  const [commentVal, setCommentVal] = useState('');
  const { t } = useSocialFeedTranslation();
  const { t: tCommon } = useCommonTranslation();
  const [shouldDisplayComments, setShouldDisplayComments] = useState(false);
  const { like, isLoading: isLikeLoading } = usePostLikeMutation();

  const { isHiddenOrBlocked } = useContext(BlockingContext);

  const isHidden = useMemo(
    () => isHiddenOrBlocked(id, userId, ComplaintTypes.socialFeed),
    [id, userId, isHiddenOrBlocked]
  );

  const {
    translations: [translatedText],
    toggleTranslation,
    isTranslating,
    isTranslated,
  } = useTranslations([text]);

  if (!user) return null;
  const nonVisualFiles = files.filter(
    ({ type }) => !visualFiles.includes(type)
  );

  const getComments = (comments: Array<types.Reply>) => {
    const commentsLength = comments.length;
    if (!shouldDisplayComments) {
      return comments.slice(commentsLength - 2, commentsLength);
    }

    return comments;
  };

  const shouldDisplayInput = () =>
    replies.length !== 0 || shouldDisplayComments;

  const isLoading = false;

  return (
    <div className="mt-3 pb-6 pt-4 shadow-atobi w-full rounded-lg">
      <div className="flex ml-6 items-center">
        <img className="w-12 h-12 rounded-lg" src={profileImage} alt={name} />
        <div className="ml-3">
          <Link
            to={routes.user.create(userId)}
            className={cx('font-bold text-sm', isHidden ? 'text-grayscale-secondary' : 'text-grayscale-primary')}
          >
            {name}
          </Link>
          <p className="text-xs flex text-grayscale-secondary mt-1">
            {createdAt}
            <Dot className="mx-2" />
            {userLocation}
          </p>
        </div>
        {!isHidden && (
          <div className="ml-auto mr-6 text-grayscale-secondary">
            {user.id === userId ? (
              <ControlsPopup
                userCommentId={userId}
                commentId={id}
                userName={name}
                editLabel={t('Edit post')}
                deleteLabel={t('Delete post')}
                onDelete={onDelete}
                onDisplayEditor={onDisplayEditModal}
                onTranslate={() => null}
                createdByMe={userId === user.id}
                isTranslated={false}
                deleteModalText={t(
                  'Are you sure you want to delete this post?'
                )}
                complaintType={ComplaintTypes.socialFeed}
              />
            ) : (
              <ComplaintsPopup
                creatorName={name}
                creatorUserId={userId}
                complaintObjectId={id}
                complaintType={ComplaintTypes.socialFeed}
                onTranslate={toggleTranslation}
                isLoading={isLoading}
                isTranslated={isTranslated}
              />
            )}
          </div>
        )}
      </div>
      {isHidden ? (
        <div className="text-base mx-6 mt-4 text-grayscale-secondary">
          {tCommon('This post has been hidden.')}
        </div>
      ) : (
        <>
          <FileContents files={files} />
          <div className="text-base mx-6 mt-4 text-grayscale-primary">
            <HtmlContent content={translatedText} isMarkdown={isMarkdown} />
            <div className="row">
              <div className="col-6">
                {nonVisualFiles.map(
                  ({ name: fileName, id: fileId, url, type }, index) => (
                    <FileButton
                      key={String(fileId)}
                      name={getFileNameFromUrl(url) || fileName}
                      url={url}
                      type={type}
                      className={cx(
                        'w-full mt-2',
                        index === 0 ? 'mt-4' : 'mt-2'
                      )}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mx-6 mt-4">
        <div className="flex items-center py-3 border-t border-b border-gray-light w-full">
          <PostData
            disabled={isLikeLoading}
            Icon={likedByMe ? LikeFillIcon : LikeIcon}
            label={tCommon('Reaction', {
              count: likesCount,
            })}
            onClick={() => like(id)}
            className="mr-6"
            iconClassName={likedByMe ? 'text-error' : undefined}
          />
          <PostData
            onClick={() => setShouldDisplayComments((prev) => !prev)}
            Icon={CommentIcon}
            label={tCommon('Comment', {
              count: replies.length,
            })}
          />
          <TypedIconButton
            onClick={toggleTranslation}
            isActive={isTranslated}
            isLoading={isTranslating}
            variant="translate"
            className="ml-4"
          />
        </div>

        <div className="my-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (commentVal.length) {
                comment({ content: commentVal });
                setCommentVal('');
              }
            }}
          >
            {shouldDisplayInput() && (
              <Input
                value={commentVal}
                onChange={(e) => setCommentVal(e.target.value)}
                placeholder={`${t('Leave a comment')}`}
                iconEnd={
                  <button type="submit">
                    <SendIcon />
                  </button>
                }
                name="comment"
              />
            )}
          </form>
        </div>
        <SocialPostComments
          postId={id}
          userId={user.id}
          comments={getComments(replies)}
        />
      </div>
    </div>
  );
};

export default SocialPost;

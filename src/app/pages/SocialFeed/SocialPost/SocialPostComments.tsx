import { ComplaintTypes } from 'app/api/complaints/constants';
import { types } from 'app/api/socialFeed';
import { Comment } from 'app/components';
import { useSocialFeedTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

import useDeletePostCommentMutation from './useDeletePostCommentMutation';
import useLikePostCommentMutation from './useLikePostCommentMutation';
import useUpdateCommentMutation from './useUpdateCommentMutation';

interface SocialPostCommentsProps {
  comments: Array<types.Reply>;
  postId: number;
  userId: number;
}

const SocialPostComments: FC<SocialPostCommentsProps> = ({
  comments,
  postId,
  userId,
}) => {
  const { t } = useSocialFeedTranslation();
  const { likeComment } = useLikePostCommentMutation(postId);
  const { deleteComment } = useDeletePostCommentMutation(postId);
  const { updateComment } = useUpdateCommentMutation();

  return (
    <div>
      {comments.map(
        ({
          id: commentId,
          text: commentText,
          name: userName,
          applauded,
          avatars,
          applaudCount,
          locationName,
          timeago,
          files,
          userId: userCommentId,
        }) => (
          <Comment
            key={commentId}
            commentId={commentId}
            userId={userId}
            deleteModalText={t('Are you sure you want to delete this comment?')}
            createdAt={timeago}
            userLocation={locationName}
            createdByMe={userCommentId === userId}
            text={commentText}
            userName={userName}
            userCommentId={userCommentId}
            files={files}
            avatar={avatars.medium}
            likedByMe={applauded}
            likesCount={applaudCount}
            complaintType={ComplaintTypes.socialFeedComment}
            onEdit={(content) => {
              updateComment({ commentId, postId, data: { content } });
            }}
            onDelete={() => deleteComment(commentId)}
            onLike={() => likeComment(commentId)}
          />
        )
      )}
    </div>
  );
};

export default SocialPostComments;

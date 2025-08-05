import { cx } from '@emotion/css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { ComplaintTypes } from 'app/api/complaints/constants';
import { Input, Spinner, Comment, PageLoader } from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import { dayjs } from 'app/utils';
import React from 'react';
import { useForm } from 'react-hook-form';
import SendIcon from 'remixicon-react/SendPlane2FillIcon';

import CommentsEmpty from './CommentsEmpty';
import useArticleCommentMutation from './useArticleCommentMutation';
import useCommentLikeMutation from './useCommentLikeMutation';
import useDeleteArticleCommentMutation from './useDeleteArticleCommentMutation';
import useEditCommentMutation from './useEditCommentMutation';
import useNewsArticleCommentsQuery from './useNewsArticleCommentsQuery';
import validationSchema from './validationSchema';

interface CommentsProps {
  id: number;
}

const defaultCommentValue = {
  content: '',
};

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const {
    data: comments,
    isLoading,
    meta,
    loadNextPage,
    isFetching,
  } = useNewsArticleCommentsQuery(id);
  const { data: user } = useAuthenticatedUser();
  const { t } = useNewsTranslation();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultCommentValue,
    resolver: zodResolver(validationSchema),
  });

  const { like } = useCommentLikeMutation(id);
  const { delete: deleteComment } = useDeleteArticleCommentMutation(id);
  const { mutate } = useArticleCommentMutation(id);
  const { edit, isLoading: isCommentUpdating } = useEditCommentMutation(id);

  if (!user) return null;
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="mt-4">
      <form
        className="ml-2 mb-4"
        onSubmit={handleSubmit((values) => {
          reset(defaultCommentValue);
          mutate(values);
        })}
      >
        <Input
          register={register}
          name="content"
          placeholder={`${t('Leave a comment')}`}
          iconEnd={
            <button className="mt-1" type="submit">
              <SendIcon />
            </button>
          }
        />
      </form>

      <div className="flex flex-col">
        {comments?.length ? (
          comments.map(
            (
              {
                id: commentId,
                userName,
                userAvatars,
                createdAt,
                text,
                userLocation,
                applaudCount,
                applaudByMe,
                createdByMe,
                userId,
              },
              index
            ) => (
              <div key={commentId} className="ml-2">
                <Comment
                  commentId={commentId}
                  userCommentId={userId}
                  deleteModalText={t(
                    'Are you sure you want to delete this comment?'
                  )}
                  userId={user.id}
                  className={cx(index !== 0 && 'mt-4')}
                  onLike={() => like(commentId)}
                  isLoading={isCommentUpdating}
                  onEdit={(content) => {
                    edit({
                      commentId,
                      content,
                    });
                  }}
                  createdByMe={createdByMe}
                  likesCount={applaudCount}
                  likedByMe={applaudByMe}
                  text={text}
                  avatar={userAvatars.small}
                  createdAt={dayjs(createdAt).fromNow()}
                  userLocation={userLocation.name}
                  userName={userName}
                  onDelete={() => deleteComment(commentId)}
                  complaintType={ComplaintTypes.newsFeedComment}
                />
              </div>
            )
          )
        ) : (
          <CommentsEmpty />
        )}

        {meta && meta.currentPage < meta.lastPage && !isFetching && (
          <button
            onClick={() => loadNextPage()}
            type="button"
            className="mx-auto text-focus mt-3"
          >
            {t('See more comments')}
          </button>
        )}
        {isFetching && (
          <div className="h-10 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;

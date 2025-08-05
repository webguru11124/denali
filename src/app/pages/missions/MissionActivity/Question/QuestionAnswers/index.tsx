import { cx } from '@emotion/css';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { PageLoader } from 'app/components';
import { useRouteId } from 'app/hooks';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { createSrcSet } from 'app/utils';
import React from 'react';

import Comment from './Comment';
import useQuestionAnswersQuery from './useQuestionAnswersQuery';

interface QuestionAnswersProps {
  isAnswered: boolean;
}

const Answers: React.FC<QuestionAnswersProps> = ({ isAnswered }) => {
  const activityId = useRouteId();

  if (typeof activityId === 'string')
    throw new Error('Activity ID should be numeric');

  const { t } = useMissionsTranslation();
  const { data: user } = useAuthenticatedUser();
  const { data, isLoading } = useQuestionAnswersQuery(activityId);

  if (isLoading || !data || !user) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col justify-center mt-12">
      <p className="text-lg w-full border-b border-gray-light pb-2 mb-1 font-bold text-grayscale-primary">
        {t('All Answers')}
      </p>
      {!isAnswered && (
        <p className="text-sm text-grayscale-secondary">
          {t('Post your answer to see your colleagues answers.')}
        </p>
      )}
      <div
        className={cx('mt-8', {
          'filter blur-md': !isAnswered,
        })}
      >
        {data.map(
          ({ timeAgo, id, answer, user: { fullname, avatars, userId } }) => (
            <Comment
              key={userId}
              isMine={user.id === userId}
              userId={userId}
              userName={fullname}
              id={id}
              avatarSrcSet={createSrcSet(avatars)}
              createdAt={timeAgo}
              content={answer}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Answers;

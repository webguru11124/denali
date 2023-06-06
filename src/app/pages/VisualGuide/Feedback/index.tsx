import { PageLoader } from 'app/components';
import { routes, constants } from 'app/router';
import { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Empty from './Empty';
import ListByUsers from './ListByUsers';
import Tags from './Tags';
import useGuideFeedbackQuery from './useGuideFeedbackQuery';
import UserFilesList from './UserFilesList';

interface FeedbackProps {
  guideId: number;
}

const Feedback: FC<FeedbackProps> = ({ guideId }) => {
  const { files, users, isLoading, filesByUsers } =
    useGuideFeedbackQuery(guideId);
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();

  if (!files || !users || !filesByUsers || isLoading) {
    return <PageLoader />;
  }

  const onUserSelect = (id: string) => {
    history.push(
      routes.visualGuide.create(
        guideId,
        constants.visualGuideTypes.feedback,
        id === userId ? undefined : Number(id)
      )
    );
  };

  const userFiles = userId ? filesByUsers?.[userId] : undefined;

  if (!files.length) {
    return (
      <div className="flex justify-center mt-8">
        <Empty />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <Tags selectedUserID={userId} onTagClick={onUserSelect} users={users} />
      {userFiles ? (
        <UserFilesList files={userFiles} />
      ) : (
        <ListByUsers onItemClick={onUserSelect} filesByUsers={filesByUsers} />
      )}
    </div>
  );
};

export default Feedback;

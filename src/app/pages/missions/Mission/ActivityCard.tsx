import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ActivityStatus } from 'app/api/missions/constants';
import { routes } from 'app/router';
import { useHistory } from 'react-router-dom';
import ChatIcon from 'remixicon-react/Chat1LineIcon';
import CheckIcon from 'remixicon-react/CheckLineIcon';
import LockIcon from 'remixicon-react/LockLineIcon';
import PlayIcon from 'remixicon-react/PlayLineIcon';
import UserIcon from 'remixicon-react/UserFollowLineIcon';

interface ActivityCardProps {
  name: string;
  completedByCount: number;
  commentsCount: number;
  status: ActivityStatus;
  id: number;
  srcSet?: string;
  missionId: number;
}

const ImageContainer = styled.div`
  height: 100px;
`;

const getIconByStatus = (status: ActivityStatus) => {
  const baseClassName = 'w-6 h-6 z-10';
  switch (status) {
    case ActivityStatus.active:
      return <PlayIcon className={cx(baseClassName, 'text-white')} />;
    case ActivityStatus.completed:
      return <CheckIcon className={cx(baseClassName, 'text-white')} />;
    default:
      return (
        <LockIcon className={cx(baseClassName, 'text-grayscale-secondary')} />
      );
  }
};

const ActivityCard = ({
  name,
  completedByCount,
  commentsCount,
  status,
  missionId,
  srcSet,
  id,
}: ActivityCardProps) => {
  const icon = getIconByStatus(status);
  const history = useHistory();
  return (
    <button
      type="button"
      className={cx('rounded-lg shadow-atobi w-full', {
        'cursor-default': status === ActivityStatus.locked,
      })}
      onClick={() => {
        if (status !== ActivityStatus.locked) {
          history.push(routes.missionActivity.create(missionId, id));
        }
      }}
    >
      <div className="pb-4">
        <div className="relative">
          <ImageContainer className="w-full bg-pink relative rounded-t-lg">
            {srcSet && (
              <div className="w-full h-full absolute top-0 left-0">
                <img
                  srcSet={srcSet}
                  alt={name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="bg-gray-light opacity-80 absolute top-0 left-0 w-full h-full rounded-t-lg" />
              </div>
            )}
            <div
              className={cx(
                'absolute shadow-alert top-1/2 left-1/2 p-1 rounded-full transform -translate-x-1/2 -translate-y-1/2',
                {
                  'bg-success': status === ActivityStatus.completed,
                  'bg-warning': status === ActivityStatus.active,
                  'bg-gray-light': status === ActivityStatus.locked,
                }
              )}
            >
              {icon}
            </div>
          </ImageContainer>
        </div>
        <p className="mt-8 text-center text-base text-grayscale-primary">
          <span className="line-clamp-1">{name}</span>
        </p>
        <div className="mt-8 flex justify-center text-xs text-grayscale-secondary items-center">
          <UserIcon className="h-4 w-4" />{' '}
          <p className="ml-1">{completedByCount}</p>
          <ChatIcon className="h-4 w-4 ml-6" />{' '}
          <p className="ml-1">{commentsCount}</p>
        </div>
      </div>
    </button>
  );
};

export default ActivityCard;

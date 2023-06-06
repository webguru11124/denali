import { cx, css } from '@emotion/css';
import { FC } from 'react';
import TeamIcon from 'remixicon-react/TeamLineIcon';

interface ThreadPictureProps {
  avatar: string;
  name: string;
  isDirect: boolean;
  isActive?: boolean;
}

const activeGroupBackgroundClassName = css`
  background: linear-gradient(
    227.49deg,
    rgba(46, 49, 146, 0.32) 23.72%,
    rgba(46, 49, 146, 0.2) 76.09%
  );
`;

const ThreadPicture: FC<ThreadPictureProps> = ({
  avatar,
  name,
  isDirect,
  isActive,
}) => (
  <div className="min-w-12 rounded overflow-hidden w-12 min-h-12 h-12 max-h-12 max-w-12">
    {isDirect ? (
      <img
        src={avatar}
        alt={name}
        className="w-full h-full rounded object-cover"
      />
    ) : (
      <div
        className={cx('flex justify-center items-center w-full h-full', {
          'bg-focus-background': !isActive,
          [activeGroupBackgroundClassName]: isActive,
        })}
      >
        <TeamIcon
          className={cx({
            'text-white': isActive,
            'text-focus': !isActive,
          })}
        />
      </div>
    )}
  </div>
);

export default ThreadPicture;

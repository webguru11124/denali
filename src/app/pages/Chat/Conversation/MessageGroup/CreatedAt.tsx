import { cx } from '@emotion/css';
import { dayjs } from 'app/utils';
import { FC } from 'react';

interface CreatedAtProps {
  createdAt: string;
  isMe: boolean;
  isDeleted: boolean;
}

const CreatedAt: FC<CreatedAtProps> = ({ createdAt, isMe, isDeleted }) => (
  <p
    className={cx('whitespace-nowrap text-xs mt-1 text-left mr-auto', {
      'text-white': isMe && !isDeleted,
      'text-grayscale-secondary': !isMe || isDeleted,
    })}
  >
    {dayjs(createdAt).fromNow()}
  </p>
);

export default CreatedAt;

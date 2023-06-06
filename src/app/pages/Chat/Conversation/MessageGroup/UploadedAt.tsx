import { cx } from '@emotion/css';
import { dayjs } from 'app/utils';
import { FC } from 'react';

interface UploadedAtProps {
  uploadedAt: string;
  className?: string;
}

const UploadedAt: FC<UploadedAtProps> = ({ uploadedAt, className }) => (
  <div className={cx('absolute bottom-0 left-0 text-xs mb-1 ml-3', className)}>
    {dayjs(uploadedAt).fromNow()}
  </div>
);

export default UploadedAt;

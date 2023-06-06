import { cx } from '@emotion/css';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { makeAvatarFromUserId } from 'app/utils';
import { FC } from 'react';
import CloseIcon from 'remixicon-react/CloseFillIcon';

interface UserTagProps {
  fullName: string;
  userId: number;
  onClick: () => void;
  className?: string;
}

const UserTag: FC<UserTagProps> = ({
  fullName,
  userId,
  onClick,
  className,
}) => {
  const selectedTenant = useSelector(selectors.getSelectedTenant);

  if (!selectedTenant) throw new Error('[UserTag]: no selected tenant');
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={cx('flex whitespace-nowrap', className)}
      >
        <span className="block w-8 h-8 rounded-l-lg bg-gray-light">
          <img
            className="w-full h-full object-cover rounded-l-lg"
            src={makeAvatarFromUserId(selectedTenant.url, userId)}
            alt={fullName}
          />
        </span>
        <span className="h-8 px-2 flex items-center bg-grayscale-bg-dark">
          {fullName}
        </span>
        <span className="w-8 bg-gray-light text-grayscale-secondary flex items-center justify-center h-8 rounded-r-lg">
          <CloseIcon className="w-6 h-6" />
        </span>
      </button>
    </div>
  );
};

export default UserTag;

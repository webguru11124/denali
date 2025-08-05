import { cx } from '@emotion/css';
import { useChatTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import AddIcon from 'remixicon-react/AddLineIcon';
import CheckIcon from 'remixicon-react/CheckLineIcon';

interface UserButtonProps {
  fullName: string;
  avatarSrc: string;
  profession: string;
  location: string;
  isSelected: boolean;
  className?: string;
  onClick: () => void;
}

const UserButton: FC<UserButtonProps> = ({
  fullName,
  avatarSrc,
  profession,
  location,
  isSelected,
  onClick,
  className,
}) => {
  const { t } = useChatTranslation();
  return (
    <button
      onClick={onClick}
      className={cx('flex items-center w-full', className)}
      type="button"
    >
      <div className="w-12 h-12 min-w-12 rounded-lg bg-gray-light">
        <img
          src={avatarSrc}
          className="w-full rounded-lg h-full object-cover"
          alt={fullName}
        />
      </div>
      <div className="h-12 flex flex-col items-start ml-3 justify-center">
        <p className="text-sm break-all font-bold text-grayscale-primary line-clamp-1 text-left mr-1">
          {fullName}
        </p>
        <p className="text-xs break-all text-grayscale-secondary text-left line-clamp-1 mr-1">
          {t('{{profession}} in {{location}}', {
            profession,
            location,
          })}
        </p>
      </div>
      <div
        className={cx(
          'ml-auto rounded-lg w-12 h-12 min-w-12 flex justify-center items-center',
          isSelected ? 'bg-focus' : 'bg-gray-light'
        )}
      >
        {isSelected ? (
          <CheckIcon className="text-white" />
        ) : (
          <AddIcon className="text-grayscale-secondary" />
        )}
      </div>
    </button>
  );
};

export default UserButton;

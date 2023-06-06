import { IconButton } from 'app/components';
import { useSocialFeedTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';
import ImageIcon from 'remixicon-react/ImageAddLineIcon';

import { UploadButtonControlsProps } from './types';

const UploadButtonControls: FC<UploadButtonControlsProps> = ({
  onAddMoreClick,
  onDeleteClick,
}) => {
  const { t } = useSocialFeedTranslation();

  return (
    <div className="absolute top-0 w-full">
      <div className="flex">
        <IconButton
          className="mt-3 ml-3"
          onClick={onAddMoreClick}
          Icon={ImageIcon}
        >
          <span className="ml-2">{t('Add more')}</span>
        </IconButton>
        <IconButton
          onClick={onDeleteClick}
          className="ml-auto mt-3 mr-3"
          Icon={CloseIcon}
        />
      </div>
    </div>
  );
};

export default UploadButtonControls;

import { IconButton } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import trashBinIcon from 'assets/icons/trash-bin.svg';
import { FC } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

interface DeleteFlowModalHeadingProps {
  onClose: () => void;
}

const DeleteFlowModalHeading: FC<DeleteFlowModalHeadingProps> = ({
  onClose,
}) => {
  const { t } = useChatTranslation();

  return (
    <div className="w-full flex relative">
      <div className="w-10 flex items-center">
        <img className="w-8 h-8" src={trashBinIcon} alt="trash bin" />
      </div>
      <div className="h-10 ml-3 flex items-center text-lg">
        {t('Delete Group')}
      </div>
      <div className="w-10 ml-auto">
        <IconButton Icon={CloseIcon} onClick={onClose} />
      </div>
    </div>
  );
};

export default DeleteFlowModalHeading;

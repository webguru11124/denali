import { Modal, CloseButton, Button } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import trashBinIcon from 'assets/icons/trash-bin.svg';
import React from 'react';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onDelete }) => {
  const { t } = useChatTranslation();

  return (
    <Modal
      onClose={onClose}
      className="pt-4"
      heading={
        <div className="flex items-center">
          <span>
            <img className="mr-3" src={trashBinIcon} alt="Delete comment" />
          </span>
          <p className="text-grayscale-primary text-lg">
            {t('Delete Message')}
          </p>
          <CloseButton className="ml-auto w-10 h-10" onClose={onClose} />
        </div>
      }
    >
      <p className="text-grayscale-primary mr-12">
        {t('Are you sure you want to delete this message?')}
      </p>
      <div className="flex mt-8">
        <Button className="mr-4 ml-16" onClick={onClose} variant="secondary">
          {t('Cancel')}
        </Button>
        <Button
          onClick={() => {
            onDelete();
            onClose();
          }}
          variant="primary"
        >
          {t('Delete')}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;

import { useComponentsTranslation } from 'app/internationalization/hooks';
import trashBinIcon from 'assets/icons/trash-bin.svg';

import Button from '../Button';
import CloseButton from '../CloseButton';
import Modal from '../Modal';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
  text: string;
}

const DeleteModal = ({ onClose, onDelete, text }: DeleteModalProps) => {
  const { t } = useComponentsTranslation();

  return (
    <Modal
      onClose={onClose}
      className="pt-4"
      heading={
        <div className="flex items-center">
          <span>
            <img
              className="mr-3"
              src={trashBinIcon}
              alt={`${t('Delete Comment')}`}
            />
          </span>
          <p className="text-grayscale-primary text-lg">
            {t('Delete Comment')}
          </p>
          <CloseButton className="ml-auto w-10 h-10" onClose={onClose} />
        </div>
      }
    >
      <p className="text-grayscale-primary mr-12">{text}</p>
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

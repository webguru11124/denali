import {
  Button,
  CloseButton,
  Modal,
  PrivacyPolicyLink,
  ResizeableTextarea,
} from 'app/components';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { useState } from 'react';
import { Trans } from 'react-i18next';
import EyeOffIcon from 'remixicon-react/EyeOffLineIcon';

interface HideModalProps {
  onClose: () => void;
  onHide: () => void;
}

const HideModal = ({ onClose, onHide }: HideModalProps) => {
  const { t } = useComponentsTranslation();

  return (
    <Modal
      onClose={onClose}
      className="pt-4"
      width="lg"
      heading={
        <div className="flex items-center">
          <span>
            <EyeOffIcon className="w-6 h-6 mr-3" />
          </span>
          <p className="text-grayscale-primary text-lg">{t('Hide?')}</p>
          <CloseButton className="ml-auto w-10 h-10" onClose={onClose} />
        </div>
      }
    >
      <p className="text-grayscale-primary mt-2">
        {t('Are you sure you want to hide this?')}
      </p>
      <div className="flex mt-8">
        <Button className="mr-4" onClick={onClose} variant="secondary">
          {t('Cancel')}
        </Button>
        <Button
          onClick={() => {
            onHide();
            onClose();
          }}
          variant="primary"
        >
          {t('Hide')}
        </Button>
      </div>
    </Modal>
  );
};

export default HideModal;

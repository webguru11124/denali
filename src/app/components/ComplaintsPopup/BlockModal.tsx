import { Button, CloseButton, Modal, ResizeableTextarea } from 'app/components';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { useState } from 'react';
import BanIcon from 'remixicon-react/Forbid2LineIcon';
interface BlockModalProps {
  onClose: () => void;
  onBlock: (reason: string) => void;
  creatorName: string;
}

const BlockModal = ({ onClose, onBlock, creatorName }: BlockModalProps) => {
  const { t } = useComponentsTranslation();
  const [reportValue, setReportValue] = useState('');

  return (
    <Modal
      onClose={onClose}
      className="pt-4"
      width="lg"
      heading={
        <div className="flex items-center">
          <span>
            <BanIcon className="w-6 h-6 mr-3" />
          </span>
          <p className="text-grayscale-primary text-lg">
            {t('Block {{creatorName}}?', {
              user: creatorName,
            })}
          </p>
          <CloseButton className="ml-auto w-10 h-10" onClose={onClose} />
        </div>
      }
    >
      <p className="text-grayscale-primary mt-2">
        {t('You won’t see posts or comments from {{creatorName}}', {
          creatorName,
        })}
      </p>
      <ResizeableTextarea
        defaultHeight={120}
        onChange={(e) => setReportValue(e.target.value)}
        className="w-full h-auto overflow-auto resize-none focus:outline-none text-grayscale-secondary bg-gray-light p-4 rounded-lg mt-6"
        placeholder={`${t(
          'Please detail the reasons for this complaint here, thank you...'
        )}`}
        value={reportValue}
        autoFocus
      />
      <div className="flex mt-8">
        <Button className="mr-4" onClick={onClose} variant="secondary">
          {t('Cancel')}
        </Button>
        <Button
          onClick={() => {
            onBlock(reportValue);
            onClose();
          }}
          variant="primary"
        >
          {t('Block')}
        </Button>
      </div>
    </Modal>
  );
};

export default BlockModal;

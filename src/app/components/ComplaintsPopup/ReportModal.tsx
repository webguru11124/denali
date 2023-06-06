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
import ErrorIcon from 'remixicon-react/ErrorWarningLineIcon';

interface ReportModalProps {
  onClose: () => void;
  onReport: (reasone: string) => void;
}

const ReportModal = ({ onClose, onReport }: ReportModalProps) => {
  const { t } = useComponentsTranslation();
  const [reportValue, setReportValue] = useState('');

  return (
    <Modal
      onClose={onClose}
      className="pt-4"
      width="lg"
      heading={
        <div className="flex items-center">
          <p className="text-grayscale-primary text-lg">
            {t('Report Inappropriate Behavior')}
          </p>
          <CloseButton className="ml-auto w-10 h-10" onClose={onClose} />
        </div>
      }
    >
      <div className="bg-gray-light rounded-lg flex items-center p-3">
        <ErrorIcon className="w-6 h-6 mr-3" />
        <div>
          <Trans
            components={{
              a: (
                <PrivacyPolicyLink
                  text={`${t('Acceptable Use Policy')}`}
                  className="text-focus"
                />
              ),
            }}
            i18nKey="components.Our Acceptable Use Policy specifies what we do and don’t allow in Atobi."
          />
        </div>
      </div>
      <p className="text-grayscale-primary mt-2">
        {t(
          'If the member is sharing content that goes against the policy, please specify how (e.g. sexually explicit, harassment, hate speech, spam).'
        )}
      </p>
      <p className="text-grayscale-primary mt-3">
        {t(
          'We will review your report, and we’ll make sure to take disciplinary action if needed.'
        )}
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
            onReport(reportValue);
            onClose();
          }}
          variant="primary"
        >
          {t('Report')}
        </Button>
      </div>
    </Modal>
  );
};

export default ReportModal;

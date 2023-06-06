import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { ComplaintStatus, ComplaintTypes } from 'app/api/complaints/constants';
import { useComplaintQuery } from 'app/api/complaints/hooks';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import DeleteTranslationIcon from 'remixicon-react/ArrowGoBackLineIcon';
import EyeOffIcon from 'remixicon-react/EyeOffLineIcon';
import FlagIcon from 'remixicon-react/Flag2LineIcon';
import BanIcon from 'remixicon-react/Forbid2LineIcon';
import MoreIcon from 'remixicon-react/More2FillIcon';
import TranslateIcon from 'remixicon-react/TranslateIcon';

import ControlButton from '../ControlButton';

import BlockModal from './BlockModal';
import HideModal from './HideModal';
import ReportModal from './ReportModal';

interface ComplaintsPopupProps {
  complaintType: ComplaintTypes;
  complaintObjectId: number;
  creatorUserId?: number;
  creatorName?: string;
  onTranslate?: () => void;
  isTranslated?: boolean;
  isLoading?: boolean;
  isChart?: boolean;
}

const ComplatinsPopup: React.FC<ComplaintsPopupProps> = ({
  complaintType,
  complaintObjectId,
  creatorUserId,
  creatorName,
  onTranslate,
  isTranslated,
  isLoading,
  isChart = false,
}) => {
  const { data: user } = useAuthenticatedUser();
  const { t } = useComponentsTranslation();
  const { mutate: createComplaint } = useComplaintQuery();

  const [shouldDisplayMore, setShouldDisplayMore] = useState(false);
  const [shouldDisplayReportModal, setShouldDisplayReportModal] =
    useState(false);
  const [shouldDisplayBlockModal, setShouldDisplayBlockModal] = useState(false);
  const [shouldDisplayHideModal, setShouldDisplayHideModal] = useState(false);

  const onCreateComplaint = (
    isUserBlock: boolean,
    status: ComplaintStatus,
    reportReson?: string
  ) => {
    const complaintId = isUserBlock ? creatorUserId : complaintObjectId;
    const type = isUserBlock ? ComplaintTypes.user : complaintType;

    if (user && complaintId) {
      createComplaint({
        type: type,
        reporter_id: user.id,
        reason_for_reporting: reportReson,
        complaint_object: {
          id: complaintId,
          status,
        },
      });
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setShouldDisplayMore(false)}>
      {shouldDisplayReportModal && (
        <ReportModal
          onReport={(reason) => {
            onCreateComplaint(false, ComplaintStatus.none, reason);
          }}
          onClose={() => setShouldDisplayReportModal(false)}
        />
      )}
      {shouldDisplayBlockModal && creatorName && (
        <BlockModal
          onBlock={(reason) =>
            onCreateComplaint(true, ComplaintStatus.blocked, reason)
          }
          onClose={() => setShouldDisplayBlockModal(false)}
          creatorName={creatorName}
        />
      )}
      {shouldDisplayHideModal && (
        <HideModal
          onHide={() => onCreateComplaint(false, ComplaintStatus.hidden)}
          onClose={() => setShouldDisplayHideModal(false)}
        />
      )}
      <button
        onClick={() => setShouldDisplayMore((prev) => !prev)}
        type="button"
        className={
          isChart
            ? 'flex items-center text-xs text-grayscale-secondary mb-2'
            : ''
        }
      >
        <MoreIcon className={isChart ? 'w-4 h-4 mr-2' : ''} />
      </button>
      <div className="relative">
        {shouldDisplayMore && (
          <div
            className={`absolute z-10 transform text-sm -translate-x-1/2 bg-light left-0 ${
              isChart ? 'bottom-0' : ''
            } shadow-atobi rounded-xl`}
          >
            {creatorName && (
              <ControlButton
                disabled={isLoading}
                className="rounded-t-xl"
                onClick={() => setShouldDisplayBlockModal(true)}
              >
                <BanIcon className="w-6 h-6 mr-4" />
                <span className="whitespace-nowrap">
                  {t('Block {{creatorName}}', {
                    user: creatorName,
                  })}
                </span>
              </ControlButton>
            )}
            <ControlButton
              disabled={isLoading}
              onClick={() => {
                setShouldDisplayReportModal(true);
              }}
            >
              <FlagIcon className="w-6 h-6 mr-4" />
              <span className="whitespace-nowrap">{t('Report')}</span>
            </ControlButton>
            <ControlButton
              disabled={isLoading}
              onClick={() => {
                setShouldDisplayHideModal(true);
              }}
            >
              <EyeOffIcon className="w-6 h-6 mr-4" />
              <span className="whitespace-nowrap">{t('Hide')}</span>
            </ControlButton>
            {!isChart && onTranslate && (
              <ControlButton
                disabled={isLoading}
                onClick={() => {
                  onTranslate();
                }}
                className="rounded-b-xl"
              >
                {isTranslated ? (
                  <DeleteTranslationIcon className="w-6 h-6 mr-4" />
                ) : (
                  <TranslateIcon className="w-6 h-6 mr-4" />
                )}
                <span className="whitespace-nowrap">{t('Translate')}</span>
              </ControlButton>
            )}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default ComplatinsPopup;

import styled from '@emotion/styled';
import { Modal, IconButton, FileButton } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { dayjs, getFileTypeFromName } from 'app/utils';
import { FC } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import useMissionStatsQuery from './useMissionStatsQuery';

interface PreviousReportsModalProps {
  onClose: () => void;
  id: number;
}

const ButtonsContainer = styled.div`
  width: 281px !important;
`;

const PreviousReportsModal: FC<PreviousReportsModalProps> = ({
  onClose,
  id,
}) => {
  const { t } = useMissionsTranslation();
  const { data: stats, isLoading } = useMissionStatsQuery(id);

  if (!stats || isLoading) return null;
  return (
    <Modal
      heading={
        <div className="flex items-center">
          <div className="font-bold text-lg font-grayscale-primary">
            {t('Previous reports')}
          </div>
          <IconButton className="ml-auto" Icon={CloseIcon} onClick={onClose} />
        </div>
      }
      onClose={onClose}
    >
      <ButtonsContainer>
        {stats?.files?.map(({ createdAt, url, id: fileId }) => (
          <FileButton
            className="mb-2 w-full"
            nameWidth={170}
            key={fileId}
            name={dayjs(createdAt).format('D MMMM YYYY')}
            type={getFileTypeFromName(url)}
            url={url}
          />
        ))}
      </ButtonsContainer>
    </Modal>
  );
};

export default PreviousReportsModal;

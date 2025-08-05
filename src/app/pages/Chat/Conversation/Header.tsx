import styled from '@emotion/styled';
import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { IconButton } from 'app/components';
import BetaTag from 'app/pages/VideoChat/components/BetaTag';
import useStartCall from 'app/pages/VideoChat/hooks/useStartCall';
import { isActiveFeatureName } from 'app/utils';
import { FC, useState } from 'react';
import PhoneIcon from 'remixicon-react/PhoneFillIcon';
import SettingsIcon from 'remixicon-react/Settings3LineIcon';

import { ThreadPicture } from '../components';

import EditConversationModal from './EditConversationModal';

interface HeaderProps {
  isDirect: boolean;
  avatar: string;
  title: string;
  participantsIds: Array<number>;
  isAdmin: boolean;
}

const HeaderContainer = styled.div`
  height: 76px;
  box-shadow: 0 8px 8px rgba(112, 112, 112, 0.04);
`;

const Header: FC<HeaderProps> = ({
  isDirect,
  avatar,
  title,
  participantsIds,
  isAdmin,
}) => {
  const { data: user } = useAuthenticatedUser();
  const [shouldDisplayEditModal, setShouldDisplayEditModal] = useState(false);
  const { startCall } = useStartCall();
  const features = useFeatures();

  const call = () => {
    const filteredParticipantsIds = participantsIds.filter(
      (participantId) => participantId !== user?.id
    );

    return startCall(filteredParticipantsIds, title);
  };

  const participantsAmount = participantsIds.length;
  return (
    <HeaderContainer className="flex justify-between items-center w-full pl-5 pr-8">
      {shouldDisplayEditModal && (
        <EditConversationModal
          isAdmin={isAdmin}
          participantsIds={participantsIds}
          conversationName={title}
          onClose={() => setShouldDisplayEditModal(false)}
          participantsAmount={participantsAmount}
        />
      )}
      <div className="flex">
        <ThreadPicture
          isActive
          isDirect={isDirect}
          name={title}
          avatar={avatar}
        />
        <p className="text-lg font-bold ml-3">{title}</p>
      </div>
      <div className="flex items-center">
        {isActiveFeatureName('videoChat', features) && (
          <button
            type="button"
            onClick={call}
            className="p-3 mr-3 flex flex-row rounded-lg bg-light shadow-atobi"
          >
            <PhoneIcon className="text-grayscale-secondary" />
            <BetaTag className="ml-3" />
          </button>
        )}
        {!isDirect && (
          <IconButton
            onClick={() => setShouldDisplayEditModal(true)}
            Icon={SettingsIcon}
          />
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;

import { RemoteParticipant } from '@azure/communication-calling';
import { CommunicationUserKind } from '@azure/communication-common';
import styled from '@emotion/styled';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { FC, useContext } from 'react';

import CallContext from '../contexts/call';

import LocalStream from './LocalStream';
import OtherParticipants from './OtherParticipants';
import RemoteStream from './RemoteStream';

const Container = styled.div`
  height: calc(100% - 140px);
  margin-bottom: 140px;
`;

const participantCountToStyle: { [key: number]: string | undefined } = {
  1: 'repeat(1, 1fr)',
  2: 'repeat(2, 1fr)',
  3: 'repeat(3, 1fr)',
  4: 'repeat(2, 2fr)',
};

const streamIndexToRowStyle: { [index: number]: string | undefined } = {
  0: '1',
  1: '1',
  2: '2',
  3: '2',
};

const streamIndexToColStyle: { [index: number]: string | undefined } = {
  0: '2',
  1: '3',
  2: '2',
  3: '3',
};

const CallGrid = styled.div<{ count: number }>`
  max-width: 1060px;
  max-height: 526px;
  grid-auto-columns: minmax(0, 1fr);
  grid-template-columns: ${({ count }) =>
    participantCountToStyle[count] ?? 'none'};
`;

const StyledRemoteStream = styled(RemoteStream)<{
  index: number;
  showExpandedGrid: boolean;
}>`
  grid-row: ${({ index, showExpandedGrid }) =>
    showExpandedGrid ? streamIndexToRowStyle[index] : 'auto'};
  grid-column: ${({ index, showExpandedGrid }) =>
    showExpandedGrid ? streamIndexToColStyle[index] : 'auto'};
`;

const StyledLocalStream = styled(LocalStream)<{ showExpandedGrid: boolean }>`
  grid-row: ${({ showExpandedGrid }) =>
    showExpandedGrid ? '1 / span 2' : 'auto'};
  grid-column: ${({ showExpandedGrid }) => (showExpandedGrid ? '1' : 'auto')};
`;

interface Props {
  groupName?: string | null;
  subtitle: string;
}

const MOST_VISIBLE_COUNT = 5;

const Media: FC<Props> = ({ groupName, subtitle }) => {
  const { data: profile } = useAuthenticatedUser();

  const {
    localVideoStream,
    call,
    localStreamRenderer,
    participants,
    isMicOn,
    dominantParticipants,
  } = useContext(CallContext);

  if (!profile || !call) {
    throw new Error('[Media]: no authenticated user');
  }

  const remoteParticipantsCount = participants.length;
  const dominantParticipantsCount = dominantParticipants.length;
  const allParticipantsCount = remoteParticipantsCount + 1;

  const showOther = remoteParticipantsCount > MOST_VISIBLE_COUNT;
  const showExpandedGrid = allParticipantsCount >= MOST_VISIBLE_COUNT;
  const visibleParticipants = showExpandedGrid
    ? dominantParticipants.slice(0, 1)
    : dominantParticipants;

  const renderRemoteStream = (
    participant: RemoteParticipant,
    index: number
  ) => {
    const { videoStreams, identifier } = participant;
    const acsId = identifier as CommunicationUserKind;
    const remoteVideoStream = videoStreams[0];

    return (
      <StyledRemoteStream
        index={index}
        showExpandedGrid={showExpandedGrid}
        key={acsId.communicationUserId}
        id={acsId.communicationUserId}
        isMuted={participant.isMuted}
        remoteVideoStream={remoteVideoStream}
      />
    );
  };

  const renderOtherParticipants = (participant: RemoteParticipant) => {
    const { identifier } = participant;
    const acsId = identifier as CommunicationUserKind;

    return (
      <OtherParticipants
        id={acsId.communicationUserId}
        otherCount={remoteParticipantsCount - dominantParticipantsCount}
      />
    );
  };

  return (
    <Container className="flex items-center justify-center flex-col rounded-xl relative w-full">
      <div className="flex items-center justify-center flex-col mb-6">
        {groupName && <span className="text-white text-lg2">{groupName}</span>}
        <span className="text-white text-base">{subtitle}</span>
      </div>
      <CallGrid
        count={allParticipantsCount}
        className="grid gap-2 rounded-xl overflow-hidden w-full h-full"
      >
        <StyledLocalStream
          showExpandedGrid={showExpandedGrid}
          isMuted={!isMicOn}
          avatar={profile.avatars.extraLarge}
          localStreamRenderer={localStreamRenderer}
          localVideoStream={localVideoStream}
        />
        {visibleParticipants.map(renderRemoteStream)}
        {showOther &&
          dominantParticipants[0] &&
          renderOtherParticipants(dominantParticipants[0])}
      </CallGrid>
    </Container>
  );
};

export default Media;

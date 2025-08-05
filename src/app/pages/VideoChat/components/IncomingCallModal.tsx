import { CommunicationUserKind } from '@azure/communication-common';
import styled from '@emotion/styled';
import { getUser, getUserChatDetailsByAcsId } from 'app/api/user/resources';
import { PublicUserProfile } from 'app/api/user/types';
import Spinner from 'app/components/Spinner';
import { useVideoChatTranslations } from 'app/internationalization/hooks';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import PhoneIcon from 'remixicon-react/PhoneFillIcon';

import CallContext from '../contexts/call';
import useInitCall from '../hooks/useInitCall';
import useLocalVideoStream from '../hooks/useLocalVideoStream';

const Container = styled.div`
  top: 51px;
  left: 50%;
  backdrop-filter: blur(15px);
  background: rgba(0, 0, 0, 0.45);
`;

const Button = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

const IncomingCallModal: FC = () => {
  const { t } = useVideoChatTranslations();
  const { incomingCall } = useContext(CallContext);
  const { createLocalStreamVideo } = useLocalVideoStream();
  const { initCall } = useInitCall();
  const { incomingCallChanged } = useContext(CallContext);
  const [profile, setProfile] = useState<PublicUserProfile>();

  const getUserProfile = useCallback(async () => {
    if (!incomingCall) return;
    const id = incomingCall.callerInfo.identifier as CommunicationUserKind;
    const user = await getUserChatDetailsByAcsId(id.communicationUserId);
    if (!user.data) return;

    const userProfile = await getUser(user.data.id);
    if (!userProfile.data.data) return;
    setProfile(userProfile.data.data);
  }, [incomingCall]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const onAccept = async () => {
    if (!incomingCall) return;
    const videoOptions = createLocalStreamVideo();
    const call = await incomingCall.accept({ videoOptions });
    incomingCallChanged(null);
    initCall(call);
  };

  const onDecline = async () => {
    if (!incomingCall) return;
    await incomingCall.reject();
  };

  return (
    <Container className="transform -translate-x-1/2 fixed z-999 flex items-center rounded-xl py-3 px-4">
      <div className="flex items-center justify-center rounded-xl mr-3 border-white border w-12 h-12 overflow-hidden">
        {profile && (
          <img
            src={profile.avatars.large}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {!profile && <Spinner />}
      </div>
      <div className="flex justify-center flex-col mr-5">
        <span className="font-bold text-white text-base">
          {incomingCall?.callerInfo.displayName}
        </span>
        <span className="text-white text-xs">{t('Incoming call...')}</span>
      </div>
      <Button
        className="bg-error ml-5 mr-3 flex items-center justify-center"
        type="button"
        onClick={onDecline}
      >
        <PhoneIcon className="text-white w-6 h-6 transform rotate-134" />
      </Button>
      <Button
        className="bg-success-dark flex items-center justify-center"
        type="button"
        onClick={onAccept}
      >
        <PhoneIcon className="text-white w-6 h-6" />
      </Button>
    </Container>
  );
};

export default IncomingCallModal;

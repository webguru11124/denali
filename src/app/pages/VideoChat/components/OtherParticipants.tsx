import styled from '@emotion/styled';
import { getUser, getUserChatDetailsByAcsId } from 'app/api/user/resources';
import { PublicUserProfile } from 'app/api/user/types';
import { CSSProperties, FC, useCallback, useEffect, useState } from 'react';

const Overlay = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
`;

const Count = styled.div`
  backdrop-filter: blur(15px);
`;

interface Props {
  otherCount: number;
  containerStyle?: CSSProperties;
  id: string;
}

const OtherParticipants: FC<Props> = ({ id, otherCount, containerStyle }) => {
  const [profile, setProfile] = useState<PublicUserProfile>();

  const getUserProfile = useCallback(async () => {
    const user = await getUserChatDetailsByAcsId(id);
    if (!user.data) return;

    const userProfile = await getUser(user.data.id);
    if (!userProfile.data.data) return;
    setProfile(userProfile.data.data);
  }, [id]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div
      style={containerStyle}
      className="relative rounded-xs bg-black flex items-center justify-center overflow-hidden w-full h-full"
    >
      <img
        alt="Participant"
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover z-10"
        src={profile?.avatars.large}
      />
      <Overlay className="absolute top-0 left-0 right-0 bottom-0 z-20" />
      <Count className="bg-white bg-opacity-25 text-center p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 rounded-xl">
        <span className="block text-white text-lg2">{`+${otherCount}`}</span>
        <span className="block text-white text-sm">Participants</span>
      </Count>
    </div>
  );
};

export default OtherParticipants;

import {
  CreateViewOptions,
  RemoteVideoStream,
  VideoStreamRenderer,
} from '@azure/communication-calling';
import { getUser, getUserChatDetailsByAcsId } from 'app/api/user/resources';
import { PublicUserProfile } from 'app/api/user/types';
import { useVideoChatTranslations } from 'app/internationalization/hooks';
import { FC, useCallback, useEffect, useState } from 'react';

import Stream from './Stream';

interface Props {
  remoteVideoStream: RemoteVideoStream | null;
  id: string;
  isMuted: boolean;
  className?: string;
}

const REMOTE_VIDEO_PREVIEW_ID = 'RemoteVideoPreview';

const VIEW_OPTIONS: CreateViewOptions = {
  scalingMode: 'Crop',
};

const RemoteStream: FC<Props> = ({
  remoteVideoStream,
  id,
  isMuted,
  className,
}) => {
  const { t } = useVideoChatTranslations();
  const [profile, setProfile] = useState<PublicUserProfile>();
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [videoStreamRenderer, setVideoStreamRenderer] =
    useState<VideoStreamRenderer | null>(null);
  const containerId = `${REMOTE_VIDEO_PREVIEW_ID}_${id}`;

  const renderRemoteStream = useCallback(async () => {
    if (remoteVideoStream && remoteVideoStream.isAvailable) {
      if (isRendered) return;
      const renderer = new VideoStreamRenderer(remoteVideoStream);
      const view = await renderer.createView(VIEW_OPTIONS);
      const container = document.getElementById(containerId);

      if (container && container.childElementCount === 0) {
        container.appendChild(view.target);
      }

      setVideoStreamRenderer(renderer);
      setIsRendered(true);
    } else {
      setIsRendered(false);
      if (videoStreamRenderer) videoStreamRenderer.dispose();
    }
  }, [isRendered, remoteVideoStream, videoStreamRenderer, containerId]);

  const getUserProfile = useCallback(async () => {
    const user = await getUserChatDetailsByAcsId(id);
    if (!user.data) return;

    const userProfile = await getUser(user.data.id);
    if (!userProfile.data.data) return;
    setProfile(userProfile.data.data);
  }, [id]);

  useEffect(() => {
    if (!remoteVideoStream) {
      setIsRendered(false);
      return undefined;
    }

    if (remoteVideoStream.isAvailable) renderRemoteStream();

    remoteVideoStream.on('isAvailableChanged', renderRemoteStream);

    return () => {
      remoteVideoStream.off('isAvailableChanged', renderRemoteStream);
    };
  }, [remoteVideoStream, renderRemoteStream]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <Stream
      displayName={
        profile ? `${profile?.firstName} ${profile?.lastName}` : t('Loading...')
      }
      avatar={profile?.avatars.extraLarge}
      videoContainerId={containerId}
      isMuted={isMuted}
      isRendered={isRendered}
      className={className}
    />
  );
};

export default RemoteStream;

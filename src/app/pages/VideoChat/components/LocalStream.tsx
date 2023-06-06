import {
  CreateViewOptions,
  LocalVideoStream,
  VideoStreamRenderer,
} from '@azure/communication-calling';
import { useVideoChatTranslations } from 'app/internationalization/hooks';
import { FC, useCallback, useEffect, useState } from 'react';

import Stream from './Stream';

const LOCAL_VIDEO_PREVIEW_ID = 'LocalVideoPreview';

const VIEW_OPTIONS: CreateViewOptions = {
  scalingMode: 'Crop',
  isMirrored: true,
};

interface Props {
  localVideoStream: LocalVideoStream | null;
  localStreamRenderer: VideoStreamRenderer | null;
  avatar: string;
  isMuted: boolean;
  className?: string;
}

const LocalStream: FC<Props> = ({
  localVideoStream,
  localStreamRenderer,
  avatar,
  isMuted,
  className,
}) => {
  const { t } = useVideoChatTranslations();
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const handleStreamRender = useCallback(async () => {
    if (!localStreamRenderer || !localVideoStream) {
      setIsRendered(false);
      return;
    }

    const view = await localStreamRenderer.createView(VIEW_OPTIONS);
    const container = document.getElementById(LOCAL_VIDEO_PREVIEW_ID);

    if (container && container.childElementCount === 0) {
      container.appendChild(view.target);
    }

    setIsRendered(true);
  }, [localVideoStream, localStreamRenderer]);

  useEffect(() => {
    handleStreamRender();
  }, [handleStreamRender]);

  return (
    <Stream
      className={className}
      displayName={t('You')}
      avatar={avatar}
      videoContainerId={LOCAL_VIDEO_PREVIEW_ID}
      isMuted={isMuted}
      isRendered={isRendered}
    />
  );
};

export default LocalStream;

import { useVideoChatTranslations } from 'app/internationalization/hooks';
import { FC, useContext } from 'react';

import CallContext from '../contexts/call';
import useCallTime from '../hooks/useCallTime';

import Controls from './Controls';
import Media from './Media';

const CallModal: FC = () => {
  const { callState, groupName } = useContext(CallContext);
  const { time } = useCallTime();
  const { t } = useVideoChatTranslations();
  const getCallSubtitle = () => {
    if (callState === 'Ringing') return t('Calling...');
    if (callState === 'Connecting') return t('Connecting...');
    if (callState === 'Disconnecting') return t('Disconnecting...');
    return callState;
  };

  const subtitle = callState === 'Connected' ? time : getCallSubtitle();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-999 bg-grayscale-primary">
      <Media groupName={groupName} subtitle={subtitle} />
      <Controls />
    </div>
  );
};

export default CallModal;

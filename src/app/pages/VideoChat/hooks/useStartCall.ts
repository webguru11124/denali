import { getUsers } from 'app/api/chat/resources';
import { useSelector } from 'app/hooks';
import { useVideoChatTranslations } from 'app/internationalization/hooks';
import { getToken } from 'app/store/auth/selectors';
import { detect } from 'detect-browser';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import CallContext from '../contexts/call';

import useInitCall from './useInitCall';
import useLocalVideoStream from './useLocalVideoStream';

const useStartCall = () => {
  const { t } = useVideoChatTranslations();
  const { callClient, callAgent, groupNameChanged, isGroupChanged } =
    useContext(CallContext);
  const apiToken = useSelector(getToken);
  const { createLocalStreamVideo } = useLocalVideoStream();
  const { initCall } = useInitCall();
  const browser = detect();
  const isFirefox = browser && browser.name === 'firefox';

  const startCall = async (
    usersIds: Array<number>,
    groupName: string | null = null
  ) => {
    if (isFirefox) {
      toast.error(
        t(
          'Your browser does not support this feature, please use another browser, such as Safari or Chrome'
        )
      );
      return;
    }

    if (!callClient || !callAgent) {
      throw new Error('Client is not initialized');
    }

    if (!apiToken) {
      throw new Error(`API token is unavailable - can't make a call`);
    }

    if (usersIds.length === 0) {
      throw new Error(`Users is not selected`);
    }

    const { data } = await getUsers(apiToken, usersIds);

    const participantsIds = Object.values(data).map(
      ({ userCommunicationId }: { userCommunicationId: string }) => ({
        communicationUserId: userCommunicationId,
      })
    );

    if (participantsIds.length === 0) {
      throw new Error(
        'User must have acs user id. Something went wrong in the API'
      );
    }

    const videoOptions = createLocalStreamVideo();
    const call = callAgent.startCall(participantsIds, { videoOptions });
    initCall(call);
    isGroupChanged(usersIds.length > 1);
    groupNameChanged(groupName);
  };

  return { startCall };
};

export default useStartCall;

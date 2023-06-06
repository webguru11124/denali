import { cx } from '@emotion/css';
import useGetChannelsQuery from 'app/api/channels/hooks/useChannelsQuery';
import {
  Modal,
  SearchInput,
  Button,
  IconButton,
  PageLoader,
  ScrollbarContainer,
} from 'app/components';
import { useDispatch } from 'app/hooks';
import useAppSelector from 'app/hooks/useSelector';
import { selectors, actions } from 'app/store/editor';
import { actions as modalActions } from 'app/store/modal';
import channelsIcon from 'assets/icons/channels-medium.svg';
import { Clock } from 'iconsax-react';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import getChannelTitle from '../../utils/getChannelTitle';

import ChannelModalImage from './ChannelModalImage';

export interface ChannelModalProps {
  canPublish?: boolean;
  setPublishModalOpen?: Dispatch<SetStateAction<boolean>>;
  setChannelModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const ChannelModal = ({
  canPublish,
  setPublishModalOpen,
  setChannelModalOpen,
}: ChannelModalProps) => {
  const [selectedChannel, setSelectedChannel] = useState<BasicChannelInfo>();
  const { data, isFetching: isLoading } = useGetChannelsQuery({
    ranking: 'desc',
    refetchOnMount: true,
  });
  const dataChannels = data?.pages?.map((page) => page.data.data).flat() ?? [];
  const recentlyUsed = dataChannels.slice(0, 3);
  const channels = dataChannels.slice(3);
  const dispatch = useDispatch();

  const articleChannel = useAppSelector(selectors.getSelectedChannel);

  const onClose = useCallback(() => {
    if (setChannelModalOpen) return setChannelModalOpen(false);
    dispatch(modalActions.hideModal());
  }, [dispatch, setChannelModalOpen]);

  const onConfirm = useCallback(
    (channel: BasicChannelInfo) => {
      dispatch(actions.addChannel(channel));
      onClose();
      if (canPublish && setPublishModalOpen) {
        setPublishModalOpen(true);
      }
    },
    [canPublish, dispatch, onClose, setPublishModalOpen]
  );

  useEffect(() => {
    if (articleChannel) setSelectedChannel(articleChannel);
  }, [articleChannel]);

  const renderRadioOption = (channel: BasicChannelInfo) => {
    return (
      <div key={channel.id} className="flex justify-between items-center mb-2">
        <div className="grow flex items-center">
          <input
            className="mr-4"
            type="radio"
            name={String(channel.title)}
            id={String(channel.id)}
            onChange={() => setSelectedChannel(channel)}
            checked={selectedChannel?.id === channel.id}
          />
          <label htmlFor={String(channel.id)} className="pr-2">
            {getChannelTitle(channel)}
          </label>
        </div>
        <div className="flex h-[45px] rounded min-w-[90px] bg-hover-blue justify-center">
          <ChannelModalImage image={channel.coverImage} isLoading={false} />
        </div>
      </div>
    );
  };

  return (
    <Modal onClose={() => null} className="w-[420px] relative">
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="absolute top-4 right-4">
            <IconButton Icon={CloseIcon} onClick={onClose} />
          </div>
          <form className="flex gap-4 flex-col">
            <div className="flex flex-col">
              <span className="text-lg font-bold flex items-center gap-2">
                <img className="h-6" src={channelsIcon} alt="" />
                <span>Select channel</span>
              </span>
              <span className="text-sm text-grayscale-secondary pt-1">
                Which channel you want to publish the article to?
              </span>
            </div>
            <div>
              <SearchInput onChange={() => {}} onClear={() => {}} value="" />
            </div>

            <ScrollbarContainer className="max-h-[290px] -mr-4 pr-4">
              {recentlyUsed.length > 0 && (
                <div>
                  <span className="flex gap-2 items-center mb-1">
                    <Clock size={16} />
                    <p className="text-sm text-grayscale-secondary">
                      Recently used
                    </p>
                  </span>
                  {recentlyUsed.map((channel) => renderRadioOption(channel))}
                </div>
              )}

              {channels.length > 0 && (
                <div>
                  <span className="text-sm mb-2 text-grayscale-secondary">
                    Channels
                  </span>
                  {channels.map((channel) => renderRadioOption(channel))}
                </div>
              )}
            </ScrollbarContainer>

            <div className="w-full flex items-center justify-center mt-1">
              <Button
                className={cx('border-0 !w-56', {
                  'bg-focus text-white': !!selectedChannel,
                  'bg-gray-dark text-grayscale-secondary': !selectedChannel,
                })}
                onClick={() => selectedChannel && onConfirm(selectedChannel)}
              >
                Select Channel
              </Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};

export default ChannelModal;

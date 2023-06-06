import styled from '@emotion/styled';
import { TablePageContainer } from 'app/components';

import ChannelForm from './components/ChannelForm';
import ChannelsList from './components/ChannelsList';
import ChannelsToastContainer from './components/ChannelsToastContainer';
import SearchContainer from './components/SearchContainer';
import { ChannelsContextProvider } from './context';
import useOrderInfo from './hooks/useOrderInfo';

const Container = styled.div`
  max-height: calc(100vh - 3.5rem);
`;

const ChannelsContent = () => {
  useOrderInfo();
  return (
    <>
      <Container className="w-full">
        <TablePageContainer className="pb-0">
          <div
            id="channelsContainer"
            className="grid grid-cols-12 gap-6 h-full grid-rows-[min-content_auto]"
          >
            <div className="col-span-12">
              <SearchContainer />
            </div>
            <ChannelsList />
            <ChannelForm />
          </div>
        </TablePageContainer>
      </Container>
      <ChannelsToastContainer toastId="ChannelActions" />
    </>
  );
};

const Channels = () => {
  return (
    <ChannelsContextProvider>
      <ChannelsContent />
    </ChannelsContextProvider>
  );
};

export default Channels;

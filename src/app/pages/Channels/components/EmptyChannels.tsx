import { useNode } from '@craftjs/core';
import styled from '@emotion/styled';
import illustration from 'assets/images/channels-illustration.svg';
import { FC } from 'react';

import { useChannelsContext } from '../context';

const Container = styled.div`
  box-shadow: 0px 0px 15px rgba(115, 117, 186, 0.08);
  border-radius: 15px;
`;

const GhostChannelItem = styled.div`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23D2CECDFF' stroke-width='2' stroke-dasharray='16%2c 16' stroke-dashoffset='93' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(115, 117, 186, 0.08);
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(black),
    to(transparent)
  );
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(black),
    to(transparent)
  );
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
`;

const EmptyChannels: FC<Props> = () => {
  const { selectFormType } = useChannelsContext();
  return (
    <Container
      onClick={() => selectFormType('empty')}
      className="pb-6 overflow-clip bg-white rounded-2xl flex flex-col items-center justify-center flex-grow relative py-8 h-full"
    >
      <GhostChannelItem className="absolute top-0 left-0 w-full h-30 " />
      <Container className="absolute top-0 left-0 w-full h-30 opacity-70" />
      <img src={illustration} alt="" />
      <h1 className="text-2xl pb-2 font-bold">Introducing Channels.</h1>
      <p className="font-lato text-base text-grayscale-secondary">
        Organise your articles in channels.
      </p>
      <p className="font-lato text-base text-grayscale-secondary">
        Start by creating your first channel.
      </p>
    </Container>
  );
};

interface Props {
  children?: React.ReactNode;
}

export default EmptyChannels;

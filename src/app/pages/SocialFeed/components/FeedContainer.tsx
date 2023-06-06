import styled from '@emotion/styled';
import config from 'app/config';
import React, { FC } from 'react';

const ContainerComponent = styled.div`
  max-width: 580px;
  @media (min-width: ${config.screenSizes['2xl']}) {
    max-width: 660px;
  }
`;

interface Props {
  children: React.ReactNode;
}

const FeedContainer: FC<Props> = ({ children }) => (
  <ContainerComponent>{children}</ContainerComponent>
);

export default FeedContainer;

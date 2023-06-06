import styled from '@emotion/styled';
import config from 'app/config';
import { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  right?: JSX.Element;
  children: ReactNode;
}

const SideContainer = styled.div`
  width: auto;

  @media (min-width: ${config.screenSizes.xl}) {
    width: 250px;
  }

  @media (min-width: ${config.screenSizes['2xl']}) {
    width: 290px;
  }
`;

const ContainerComponent = styled.div`
  width: 690px;
  @media (min-width: ${config.screenSizes['2xl']}) {
    width: 930px;
  }
`;

const Container = ({ children, className, right }: ContainerProps) => (
  <div className="flex flex-between xl:flex-row flex-col h-full">
    {right && <SideContainer className="xl:block hidden" />}
    <ContainerComponent className={className}>{children}</ContainerComponent>
    {right && <SideContainer>{right}</SideContainer>}
  </div>
);

export default Container;

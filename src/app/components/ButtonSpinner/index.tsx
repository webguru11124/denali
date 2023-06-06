import styled from '@emotion/styled';
import { FC } from 'react';

import Spinner from '../Spinner';

interface ButtonSpinnerProps {
  className?: string;
}

const ButtonSpinnerContainer = styled.div`
  .loader {
    margin: 0px !important;
  }
`;

const ButtonSpinner: FC<ButtonSpinnerProps> = () => (
  <ButtonSpinnerContainer>
    <Spinner />
  </ButtonSpinnerContainer>
);

export default ButtonSpinner;

import styled from '@emotion/styled';
import config from 'app/config';
import { ToastContainer as ToastifyContainer } from 'react-toastify';

const SimpleToastContainer = ({ toastId }: { toastId: string }) => {
  return (
    <StyledToastContainer
      enableMultiContainer
      containerId={toastId}
      limit={1}
    />
  );
};

const StyledToastContainer = styled(ToastifyContainer)`
  &&&.Toastify__toast-container {
    width: initial;
  }

  .Toastify__toast {
    display: inline-block;
    background-color: ${config.colors['grayscale-primary']};
    height: 36px;
    min-height: 36px;
    padding: 0;
    margin-bottom: 15px;
    border-radius: 12px;
  }
`;

export default SimpleToastContainer;

import styled from '@emotion/styled';
import config from 'app/config';
import { ToastContainer as ToastifyContainer } from 'react-toastify';

const ChannelsToastContainer = ({ toastId }: { toastId: string }) => {
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
    padding: 0;
    width: auto;
    bottom: 2rem;
  }

  .Toastify__toast {
    background-color: transparent;
    min-height: 36px;
    padding: 0;
    margin: 0;
  }
  .Toastify__toast-body {
    padding: 0;
  }
`;

export default ChannelsToastContainer;

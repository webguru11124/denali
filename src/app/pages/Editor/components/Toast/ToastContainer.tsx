import styled from '@emotion/styled';
import { ToastContainer as ToastifyContainer } from 'react-toastify';

const ToastContainer = ({ toastId }: { toastId: string }) => {
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
    width: 632px;
  }

  .Toastify__toast {
    padding: 0;
    margin-bottom: 15px;
    border-radius: 12px;
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;

    & > div {
      height: 100%;
    }
  }
`;

export default ToastContainer;

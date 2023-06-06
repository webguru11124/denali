import { css } from '@emotion/css';
import config from 'app/config';
import React from 'react';
import {
  ToastContainer as ToastContainerLib,
  TypeOptions,
  ToastContainerProps,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from 'remixicon-react/CloseLineIcon';
import ErrorIcon from 'remixicon-react/ErrorWarningLineIcon';
import ThumbIcon from 'remixicon-react/ThumbUpLineIcon';

const className = css`
  .Toastify__toast {
    border-radius: 16px;

    .Toastify__toast-body {
      display: flex;
      align-items: center;
      line-height: 1.25rem; //20px
      font-size: 0.875rem; //14px
    }
  }
  .Toastify__toast--success {
    color: ${config.colors.success};
    background-color: ${config.colors['success-background']};
  }

  .Toastify__toast--error {
    color: ${config.colors.error};
    background-color: ${config.colors['error-light']};
  }
`;

const ToastContainer: React.FC<ToastContainerProps> = (props) => (
  <ToastContainerLib
    enableMultiContainer
    icon={({ type }: { type: TypeOptions }) => {
      switch (type) {
        case 'success':
          return <ThumbIcon className="text-success h-6 w-6" />;
        case 'error':
          return <ErrorIcon className="text-error h-6 w-6" />;
        default:
          return null;
      }
    }}
    autoClose={5000}
    newestOnTop
    draggable
    className={className}
    closeOnClick
    position="top-center"
    hideProgressBar
    closeButton={() => (
      <div className="h-full my-auto">
        <CloseIcon />
      </div>
    )}
    {...props}
  />
);

export default ToastContainer;

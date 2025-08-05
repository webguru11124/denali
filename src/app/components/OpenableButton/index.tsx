import styled from '@emotion/styled';
import { FC } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

interface OpenableButtonProps {
  onClick: () => void;
  label: string;
}

const Button = styled.button`
  .label {
    display: none;
  }
  :hover {
    padding-left: 8px;
    .icon {
      margin-left: 8px;
    }
    .label {
      display: block;
    }
  }
`;

const OpenableButton: FC<OpenableButtonProps> = ({ onClick, label }) => (
  <Button
    type="button"
    className="flex items-center transition-all duration-300 bg-gray-light rounded-lg"
    onClick={onClick}
  >
    <span className="label text-xs text-grayscale-secondary whitespace-nowrap">
      {label}
    </span>
    <div className="icon p-2 rounded-lg w-10 h-10 shadow-card bg-light">
      <CloseIcon className="text-grayscale-secondary" />
    </div>
  </Button>
);

export default OpenableButton;

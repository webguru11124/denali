import { cx } from '@emotion/css';
import React from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

interface CloseButtonProps {
  onClose: () => void;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose, className }) => (
  <button
    type="button"
    className={cx(
      'bg-light text-grayscale-secondary shadow-card text flex items-center justify-center w-8 h-8 rounded-lg',
      className
    )}
    onClick={onClose}
  >
    <CloseIcon />
  </button>
);

export default CloseButton;

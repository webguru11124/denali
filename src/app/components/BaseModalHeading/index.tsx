import { FC } from 'react';
import BackIcon from 'remixicon-react/ArrowLeftSLineIcon';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import IconButton from '../IconButton';

interface BaseModalHeadingProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
}

const BaseModalHeading: FC<BaseModalHeadingProps> = ({
  title,
  onClose,
  onBack,
}) => (
  <div className="w-full flex justify-center relative">
    <div className="w-10">
      {onBack && <IconButton Icon={BackIcon} onClick={onBack} />}
    </div>
    <div className="h-10 ml-auto flex items-center text-lg">{title}</div>
    <div className="w-10 ml-auto">
      <IconButton Icon={CloseIcon} onClick={onClose} />
    </div>
  </div>
);

export default BaseModalHeading;

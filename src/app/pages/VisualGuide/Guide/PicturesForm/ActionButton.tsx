import { Button } from 'app/components';
import { FC } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

interface ActionButtonProps {
  label: string;
  Icon: RemixiconReactIconComponentType;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton: FC<ActionButtonProps> = ({
  Icon,
  label,
  onClick,
  disabled,
}) => (
  <Button variant="primary" onClick={onClick} disabled={disabled}>
    <span className="flex justify-center items-center pr-2">
      <span className="text-sm ml-auto">{label}</span>
      <span className="px-1 ml-auto">
        <Icon className="w-6 h-6" />
      </span>
    </span>
  </Button>
);

export default ActionButton;

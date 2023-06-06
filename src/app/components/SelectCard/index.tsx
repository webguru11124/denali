import { FC } from 'react';
import ArrowIcon from 'remixicon-react/ArrowRightSLineIcon';

interface SelectCardProps {
  onSelect: () => void;
  imageContent?: JSX.Element;
  label: string;
  content?: string;
}

const SelectCard: FC<SelectCardProps> = ({
  onSelect,
  imageContent,
  label,
  content,
}) => (
  <div className="flex items-center pr-4 rounded-lg mb-2 w-full shadow-card bg-white">
    <div className="overflow-hidden rounded-l-lg h-16 w-16 bg-gray-light text-grayscale-secondary flex items-center justify-center">
      {imageContent}
    </div>
    <div className="flex flex-col justify-center pl-4">
      <p className="text-grayscale-primary text-sm">{label}</p>
      <p className="text-grayscale-secondary text-xs">{content}</p>
    </div>
    <div className="ml-auto">
      <button
        onClick={onSelect}
        type="button"
        className="p-1 bg-gray-light rounded"
      >
        <ArrowIcon className="text-grayscale-secondary" />
      </button>
    </div>
  </div>
);

export default SelectCard;

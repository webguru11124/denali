import React from 'react';

interface OptionProps {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
}

const Option: React.FC<OptionProps> = ({ label, onSelect, isSelected }) => (
  <button
    type="button"
    className="pl-4 text-left flex items-center hover:bg-gray-light"
    onClick={onSelect}
  >
    <div className="w-6 h-6 p-0.5 my-2 mr-2 rounded-sm border border-grayscale-primary">
      {isSelected && <div className="rounded-sm bg-focus w-full h-full" />}
    </div>
    {label}
  </button>
);

export default Option;

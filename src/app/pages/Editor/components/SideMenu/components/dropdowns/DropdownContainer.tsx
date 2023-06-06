import { ReactNode } from 'react';

interface DropdownContainerProps {
  children: ReactNode;
}

const DropdownContainer = ({ children }: DropdownContainerProps) => {
  return (
    <div
      className="dropdown flex-col w-[210px] bg-white rounded-2xl p-4 hidden absolute whitespace-nowrap cursor-default shadow-atobi"
      role="presentation"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default DropdownContainer;

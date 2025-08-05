import { ReactNode } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

interface TagProps {
  onDelete: () => void;
  children: ReactNode;
}

const Tag = ({ children, onDelete }: TagProps) => (
  <div className="group rounded-xl text-grayscale-primary inline-block bg-grayscale-bg-dark text-sm items-center">
    <div className="flex items-center">
      <div className="pr-3 pl-4">{children}</div>
      <button
        type="button"
        className="text-grayscale-secondary p-1 group-hover:bg-gray-dark bg-gray-light rounded-r-xl"
        onClick={onDelete}
      >
        <CloseIcon />
      </button>
    </div>
  </div>
);

export default Tag;

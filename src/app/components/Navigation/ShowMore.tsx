import config from 'app/config';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import React from 'react';

interface ShowMoreProps {
  onClick: () => void;
  isActive: boolean;
}

const ShowMore: React.FC<ShowMoreProps> = ({ onClick, isActive }) => (
  <button
    className="overflow-hidden rounded py-3 px-4 mb-1 flex text-sm items-center"
    onClick={onClick}
  >
    <div className="flex justify-center items-center w-6 h-6 mr-2">
      {isActive ? (
        <ArrowUp2 color={config.colors.focus} />
      ) : (
        <ArrowDown2 color={config.colors.focus} />
      )}
    </div>

    <span className="text-focus">Show {isActive ? 'less' : 'more'}</span>
  </button>
);

export default ShowMore;

import { Icon } from 'iconsax-react';
import uniqueId from 'lodash/uniqueId';
import { ChangeEvent } from 'react';

interface MediaBlockPlaceholderProps {
  type: string;
  TypeIcon: Icon;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MediaBlockPlaceholder = ({
  type,
  TypeIcon,
  onChange,
}: MediaBlockPlaceholderProps) => {
  const uniq = uniqueId(type);
  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 w-full h-[385px] bg-grayscale-bg-dark text-grayscale-secondary rounded-lg">
      <label
        htmlFor={uniq}
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <TypeIcon size={80} variant="Linear" />
        <span>Upload {type}</span>
        {onChange && (
          <input
            id={uniq}
            className="hidden"
            type="file"
            onChange={(e) => onChange(e)}
          />
        )}
      </label>
    </div>
  );
};

export default MediaBlockPlaceholder;

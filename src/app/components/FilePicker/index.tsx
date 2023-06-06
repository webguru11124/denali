import { ChangeEventHandler, ReactNode, useRef } from 'react';

const ACCEPT_TYPES = {
  image: 'image/*',
  video: 'video/*',
};

interface FilePickerProps {
  accept?: keyof typeof ACCEPT_TYPES;
  onChange: (file: File) => void;
  className?: string;
  children: ReactNode;
}

const FilePicker = ({
  onChange,
  className,
  children,
  accept,
}: FilePickerProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files);

    if (files[0]) {
      onChange(files[0]);
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (imageInputRef.current) {
          imageInputRef.current.click();
        }
      }}
      className={className}
    >
      {children}
      <input
        accept={accept ? ACCEPT_TYPES[accept] : undefined}
        ref={imageInputRef}
        onChange={handleChange}
        type="file"
        className="hidden"
      />
    </button>
  );
};

export default FilePicker;

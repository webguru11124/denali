import { cx } from '@emotion/css';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';

import { ImperativeFileButtonHandlerProps } from './types';

interface FileButtonProps {
  label: string;
  className?: string;
  Icon: RemixiconReactIconComponentType;
  onFileUpload: (files: Array<File>) => void;
  acceptTypes?: string;
}

const AddFileButton = forwardRef<
  ImperativeFileButtonHandlerProps,
  FileButtonProps
>(({ label, className, Icon, onFileUpload, acceptTypes }, forwardedRef) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(forwardedRef, () => ({
    click: () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    },
  }));

  return (
    <button
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      }}
      type="button"
      className={cx(
        'flex-grow py-4 pl-8 pr-6 hover:bg-focus-background rounded-lg',
        className
      )}
    >
      <input
        value={[]}
        onChange={(e) => {
          const fileList = e.target.files;
          if (fileList) {
            onFileUpload(Array.from(fileList));
          }
        }}
        accept={acceptTypes}
        type="file"
        className="hidden"
        ref={inputRef}
      />
      <div className="flex items-center justify-center w-full">
        <Icon className="w-8 h-8 mr-2" />
        <div className="text-base font-bold">{label}</div>
      </div>
    </button>
  );
});

export default AddFileButton;

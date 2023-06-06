import { FileIcon, Dot, IconButton } from 'app/components';
import {
  getFileNameFromUrl,
  getSizeStringFromUrl,
  getFileTypeFromName,
  types,
  getFileType,
} from 'app/utils';
import prettyBytes from 'pretty-bytes';
import { useState, useEffect } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import { UploadButtonControlsProps } from './types';

interface UploadedFileProps extends UploadButtonControlsProps {
  url: string;
  file?: File;
}

interface Metadata {
  size: string;
  name: string;
  type: types.FileType;
}

const UploadedFile = ({ file, url, onDeleteClick }: UploadedFileProps) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  useEffect(() => {
    if (metadata) return undefined;
    if (file) {
      setMetadata({
        type: getFileType(file),
        size: prettyBytes(file.size, { maximumFractionDigits: 0 }),
        name: file.name,
      });
      return undefined;
    }

    getSizeStringFromUrl(url).then((size) => {
      const name = getFileNameFromUrl(url);
      setMetadata({
        size: size || '',
        name,
        type: getFileTypeFromName(name),
      });
    });

    return undefined;
  }, [file, metadata, url]);

  if (!metadata) return null;
  return (
    <div className="flex items-center bg-focus-background rounded py-2 pl-4 pr-3 mb-1">
      <FileIcon type={metadata.type} />
      <div className="ml-4 flex flex-col">
        <span className="text-sm text-grayscale-primary font-bold">
          <span className="line-clamp-1">{metadata.name}</span>
        </span>
        <span className="text-xs text-grayscale-secondary mt-1">
          {metadata.type.toUpperCase()} <Dot /> {metadata.size}
        </span>
      </div>
      <IconButton
        onClick={onDeleteClick}
        Icon={CloseIcon}
        className="ml-auto"
      />
    </div>
  );
};

export default UploadedFile;

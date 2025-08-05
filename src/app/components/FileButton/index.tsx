import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { getFileType, getSizeStringFromUrl } from 'app/utils';
import { useEffect, useState } from 'react';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

import Dot from '../Dot';
import FileIcon from '../FileIcon';

interface FileButtonProps {
  name: string;
  type: string;
  className?: string;
  nameWidth?: number;
  url: string;
  onDownloadSuccess?: () => void;
}

const ArrowContainer = styled.div`
  background-color: rgba(254, 255, 254, 0.5);
`;

const FileButton = ({
  name,
  type,
  className,
  url,
  onDownloadSuccess,
}: FileButtonProps) => {
  const [fileSize, setFileSize] = useState<string | undefined>();
  useEffect(() => {
    getSizeStringFromUrl(url).then(setFileSize);
  }, [url]);
  const fileType = getFileType({ name, type });

  return (
    <a
      className={cx(
        'flex items-center py-3 pl-4 pr-2 rounded bg-focus-background',
        className
      )}
      onClick={() => {
        if (!onDownloadSuccess) return;
        onDownloadSuccess();
      }}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <FileIcon type={fileType} />
      <div className="text-left ml-4 mr-2 overflow-hidden">
        <div className="break-words">
          <p className="text-sm font-bold line-clamp-1">{name}</p>
        </div>
        <div className="flex text-xs items-center">
          <p>{fileType}</p>
          <Dot className="text-grayscale-secondary mx-2" />
          <p>{fileSize}</p>
        </div>
      </div>
      <ArrowContainer className="bg-light p-1 rounded ml-auto">
        <ArrowRightIcon className="text-grayscale-secondary w-6 h-6" />
      </ArrowContainer>
    </a>
  );
};

export default FileButton;

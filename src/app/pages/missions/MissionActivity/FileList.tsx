import { types } from 'app/api/missions';
import { FileButton } from 'app/components';
import { useScreenBreakpoint } from 'app/hooks';
import React from 'react';

interface FileListProps {
  files: Array<types.LogoResponsive>;
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const breakpoint = useScreenBreakpoint();
  return (
    <div className="row mt-4">
      {files.map(({ name: fileName, type, url, id: fileId }) => (
        <div className="col-6 mt-3" key={fileId}>
          <FileButton
            className="w-full"
            name={fileName}
            nameWidth={breakpoint === '2xl' ? 180 : 100}
            type={type}
            url={url}
          />
        </div>
      ))}
    </div>
  );
};

export default FileList;
